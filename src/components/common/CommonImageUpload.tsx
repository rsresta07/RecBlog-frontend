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
