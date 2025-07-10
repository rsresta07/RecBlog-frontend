import getCroppedImg from "@/utils/getCropImage";
import { Button, Modal, Slider, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";

interface ImageCropperProps {
  imgSrc: string | null;
  setCroppedImage: (image: Blob | null) => void;
  onClose?: () => void;
}

const ImageCropper = ({
  imgSrc,
  setCroppedImage,
  onClose,
}: ImageCropperProps) => {
  const [opened, setOpened] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(16 / 9); // Default aspect ratio for blog posts
  const [originalImageRatio, setOriginalImageRatio] = useState(16 / 9);
  const largerScreen = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = async () => {
    try {
      if (!croppedAreaPixels || !imgSrc) return;

      const croppedImage = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
        rotation
      );

      if (croppedImage) {
        setCroppedImage(croppedImage as Blob);
      }

      handleClose();
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const handleClose = () => {
    setOpened(false);
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
    if (onClose) {
      onClose();
    }
  };

  const onImageLoad = (image: any) => {
    const naturalRatio = image?.naturalWidth / image?.naturalHeight;
    setOriginalImageRatio(naturalRatio);
    // Set aspect ratio based on image orientation
    if (naturalRatio > 1.5) {
      setAspect(16 / 9); // Landscape
    } else if (naturalRatio < 0.8) {
      setAspect(9 / 16); // Portrait
    } else {
      setAspect(1); // Square
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (imgSrc) {
      setOpened(true);
    }
  }, [imgSrc, router.isReady]);

  return (
    <Modal
      opened={opened}
      size={largerScreen ? "lg" : "sm"}
      onClose={handleClose}
      title="Crop Image"
      centered
    >
      <div className="relative h-[400px] bg-light-bg mb-4">
        {imgSrc && (
          <Cropper
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            cropShape="rect"
            objectFit="contain"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onMediaLoaded={onImageLoad}
          />
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Text size="sm" mb={8}>
            Zoom
          </Text>
          <Slider
            value={zoom}
            onChange={setZoom}
            min={1}
            max={5}
            step={0.1}
            color="blue"
          />
        </div>

        <div>
          <Text size="sm" mb={8}>
            Rotation
          </Text>
          <Slider
            value={rotation}
            onChange={setRotation}
            min={0}
            max={360}
            color="yellow"
          />
        </div>

        <div>
          <Text size="sm" mb={8}>
            Aspect Ratio
          </Text>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="xs"
              onClick={() => setAspect(originalImageRatio)}
            >
              Original
            </Button>
            <Button variant="outline" size="xs" onClick={() => setAspect(1)}>
              1:1
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setAspect(4 / 3)}
            >
              4:3
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setAspect(16 / 9)}
            >
              16:9
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setAspect(3 / 4)}
            >
              3:4
            </Button>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={showCroppedImage} variant="gradient">
            Crop & Upload
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropper;
