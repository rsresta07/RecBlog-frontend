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

      <Group grow>
        <div>
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
      </Group>
    </Modal>
  );
}
