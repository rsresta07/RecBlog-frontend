import imageCompression from "browser-image-compression";

/**
 * Compresses an image file using specified options.
 *
 * @param {any} imageFile - The image file to be compressed.
 * @returns {Promise<File>} A promise that resolves to the compressed image file.
 * @throws Will log an error if compression fails.
 */
export async function handleImageCompression(imageFile: any) {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    maxIteration: 15,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}
