import {
  Modal,
  TextInput,
  Button,
  Group,
  CopyButton,
  Text,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface ShareModalProps {
  opened: boolean;
  onClose: () => void;
  url?: string; // Optional override
}

/**
 * ShareModal component for sharing a blog post link.
 *
 * This modal provides a user interface for copying a link to share a blog post.
 * It manages the display of the current or provided URL and allows users to
 * copy it to the clipboard using a button.
 *
 * @param {boolean} opened - Controls the visibility of the modal.
 * @param {function} onClose - Callback to handle closing the modal.
 * @param {string} [url] - Optional URL to override the default current window location.
 *
 * @returns {JSX.Element} A modal containing a TextInput for the link and a CopyButton.
 */
export default function ShareModal({ opened, onClose, url }: ShareModalProps) {
  const [link, setLink] = useState("");

  useEffect(() => {
    // Default to current window URL
    setLink(url || window.location.href);
  }, [url, opened]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Share this blog"
      centered
      size="lg"
    >
      <Text mb="sm">Copy the link below to share this blog post:</Text>

      <section className="flex w-full gap-6 items-center">
        <div className="w-full">
          <TextInput value={link} readOnly />
        </div>
        <div>
          <CopyButton value={link} timeout={2000}>
            {({ copied, copy }) => (
              <Button
                color={copied ? "teal" : "blue"}
                onClick={copy}
                leftSection={
                  copied ? <IconCheck size={16} /> : <IconCopy size={16} />
                }
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </CopyButton>
        </div>
      </section>
    </Modal>
  );
}
