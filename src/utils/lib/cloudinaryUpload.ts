import imageCompression from "browser-image-compression";

/**
 * Uploads an image file to Cloudinary.
 *
 * Compresses the image with reasonable defaults (1MB, 1920px), and then
 * uploads it to Cloudinary using the unsigned endpoint. The upload preset
 * is read from the `NEXT_PUBLIC_CLOUDINARY_PRESET` environment variable.
 *
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} A promise that resolves to the full HTTPS URL
 *   of the uploaded image.
 * @throws If the upload fails for any reason, this function will throw an
 *   error.
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  // 1) compress (optional)
  const compressed = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });

  // 2) prepare form-data
  const fd = new FormData();
  fd.append("file", compressed);
  fd.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

  // 3) POST to Cloudinary unsigned endpoint
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD
    }/upload`,
    { method: "POST", body: fd }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");
  const json = await res.json();
  return json.secure_url as string; // full https URL
}
