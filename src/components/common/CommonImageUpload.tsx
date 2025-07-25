import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Group, Text, Image, Modal, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { CloudUpload, X } from "lucide-react";
import ImageCropper from "./ImageCropper";
import { uploadImageToCloudinary } from "@/utils/lib/cloudinaryUpload";

interface CommonImageUploadProps {
  control: any;
  name: string;
  label: string;
  rules?: any;
  errors: any;
  required?: boolean;
  existingImageUrl?: string | null;
  onImageChange?: (url: string | null) => void;
}

/**
 * A component for uploading and managing images with optional cropping and preview functionality.
 *
 * @param {object} control - React Hook Form's control object for managing form state.
 * @param {string} name - The name of the input field.
 * @param {string} label - The label text for the image upload field.
 * @param {object} rules - Validation rules for the input field.
 * @param {object} errors - Object containing validation errors for the input field.
 * @param {boolean} [required=false] - Indicates if the image upload is required.
 * @param {string|null} [existingImageUrl=null] - The URL of an existing image to be displayed initially.
 * @param {function} [onImageChange] - Callback function to notify parent component of image changes.
 *
 * @returns {JSX.Element} The CommonImageUpload component.
 */
const CommonImageUpload = ({
  control,
  name,
  label,
  rules,
  errors,
  required = false,
  existingImageUrl = null,
  onImageChange,
}: CommonImageUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    existingImageUrl
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | Blob | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [invalid, setInvalid] = useState(false);

  /**
   * Uploads a cropped image blob to Cloudinary, updates the component state,
   * and notifies the parent component of the image URL.
   *
   * @param {Blob} croppedBlob - The cropped image blob to be uploaded.
   * @returns {Promise<string>} The URL of the uploaded image.
   * @throws Will throw an error if the upload fails.
   */
  const uploadImage = async (croppedBlob: Blob) => {
    try {
      setIsLoading(true);
      setInvalid(false);

      // Convert blob to File object for Cloudinary upload
      const file = new File([croppedBlob], "cropped-image.png", {
        type: "image/png",
      });

      const imageUrl = await uploadImageToCloudinary(file);
      setUploadedImageUrl(imageUrl);
      setPreviewUrl(imageUrl);

      // Notify parent component of image change
      if (onImageChange) {
        onImageChange(imageUrl);
      }

      return imageUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      setInvalid(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (croppedImage && croppedImage instanceof Blob) {
      uploadImage(croppedImage);
    }
  }, [croppedImage]);

  /**
   * Handles the removal of the uploaded image by resetting the uploaded image URL and preview URL.
   * Notifies the parent component of the image change by passing null.
   */
  const handleRemoveImage = () => {
    setUploadedImageUrl(null);
    setPreviewUrl(null);
    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <>
      <div>
        <Text size="sm" mb={5}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Text>

        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <>
              {previewUrl ? (
                <div className="mb-4">
                  <div className="relative inline-block">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={220}
                      height={160}
                      radius="md"
                      onClick={() => setShowModal(true)}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    />
                    <Button
                      size="xs"
                      color="red"
                      variant="filled"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <Dropzone
                  loading={isLoading}
                  onDrop={(files) => {
                    if (files[0]) {
                      setImgSrc(URL.createObjectURL(files[0]));
                      field.onChange(files[0]);
                    }
                  }}
                  onReject={() => setInvalid(true)}
                  accept={IMAGE_MIME_TYPE}
                  maxSize={5 * 1024 * 1024} // 5MB
                >
                  <Group
                    style={{
                      minHeight: 160,
                      pointerEvents: "none",
                    }}
                  >
                    <Dropzone.Accept>
                      <CloudUpload size={50} color="#6E7191" />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <X size={50} color="red" />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <CloudUpload size={50} color="#6E7191" />
                    </Dropzone.Idle>

                    <div>
                      <Text size="xl" inline color="#6E7191">
                        Drag image here or click to select file
                      </Text>
                      <Text size="sm" color="dimmed" inline mt={7}>
                        File should not exceed 5MB
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
              )}
            </>
          )}
        />

        {/* Error Messages */}
        {errors[name] && (
          <Text color="red" size="xs" mt={5}>
            {errors[name].message}
          </Text>
        )}

        {invalid && (
          <Text color="red" size="xs" mt={5}>
            Invalid image format or upload failed!
          </Text>
        )}

        {/* Image Cropper Modal */}
        <ImageCropper
          imgSrc={imgSrc}
          setCroppedImage={setCroppedImage}
          onClose={() => setImgSrc(null)}
        />

        {/* Preview Modal */}
        <Modal
          opened={showModal}
          onClose={() => setShowModal(false)}
          centered
          size="xl"
          title="Image Preview"
        >
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Full size preview"
              fit="contain"
              height={600}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default CommonImageUpload;
