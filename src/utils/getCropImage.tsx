/**
 * Creates an `HTMLImageElement` from a given URL.
 *
 * @param {string} url - The URL of the image to be loaded.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the `HTMLImageElement` when the image is fully loaded.
 *                                      The promise will reject with an error if the image fails to load.
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

/**
 * Converts a given angle in degrees to radians.
 *
 * @param {number} degreeValue - The angle in degrees to be converted.
 * @returns {number} The angle in radians.
 */
export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Calculates the size of an image element after rotation.
 *
 * @param {number} width - The width of the image element in its original orientation.
 * @param {number} height - The height of the image element in its original orientation.
 * @param {number} rotation - The rotation of the image element in degrees.
 * @returns {{width: number, height: number}} An object containing the width and height of the rotated image element.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Flip {
  horizontal: boolean;
  vertical: boolean;
}

/**
 * Takes an image URL, a pixel crop object, rotation, and flip object as parameters,
 * and returns a Promise that resolves with a Blob of the cropped image.
 *
 * @param {string} imageSrc - The URL of the image to be cropped.
 * @param {PixelCrop} pixelCrop - An object containing the x, y, width, and height coordinates of the desired crop.
 * @param {number} [rotation=0] - The rotation of the image in degrees.
 * @param {Flip} [flip={ horizontal: false, vertical: false }] - An object containing the horizontal and vertical flip flags.
 *
 * @returns {Promise<Blob | null>} A promise that resolves with a Blob of the cropped image, or null if there is an error.
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation = 0,
  flip: Flip = { horizontal: false, vertical: false }
): Promise<Blob | null> {
  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const rotRad = getRadianAngle(rotation);

    // Calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    // Set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // Translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // Draw rotated image
    ctx.drawImage(image, 0, 0);

    // Extract the cropped image using pixel crop values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    // Set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Paste generated rotated image at the top left corner
    ctx.putImageData(data, 0, 0);

    // Return as Blob for upload
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (file) => {
          if (file) {
            resolve(file);
          } else {
            reject(new Error("Canvas toBlob failed"));
          }
        },
        "image/png",
        0.95 // Quality for PNG (0.95 = 95% quality)
      );
    });
  } catch (error) {
    console.error("Error in getCroppedImg:", error);
    return null;
  }
}
