import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  MultiSelect,
  Loader,
  Group,
  Stack,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconAdjustments } from "@tabler/icons-react";

// API helpers (assumes these exist in your codebase)
import { ApiGetPreferences, ApiUpdatePreferences } from "@/api/user";
import { ApiGetTag } from "@/api/tag";
import CommonButton from "../common/CommonButton";

const EditPreferencesModal = () => {
  const [opened, setOpened] = useState(false);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch all tags and current prefs once on modal open
  useEffect(() => {
    if (!opened) return;
    (async () => {
      setLoading(true);
      try {
        const [{ data: tags }, { data: prefs }] = await Promise.all([
          ApiGetTag(),
          ApiGetPreferences(),
        ]);
        setOptions(tags.map((t: any) => ({ value: t.id, label: t.title })));
        setSelected(prefs.map((p: any) => p.id));
      } catch (err: any) {
        showNotification({
          color: "red",
          title: "Error",
          message: err?.response?.data?.message || "Could not load tags",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [opened]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await ApiUpdatePreferences(selected);
      showNotification({
        color: "green",
        title: "Success",
        message: "Preferences updated",
      });
      setOpened(false);
    } catch (err: any) {
      showNotification({
        color: "red",
        title: "Update failed",
        message: err?.response?.data?.message || "Could not save preferences",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <CommonButton
        // leftIcon={<IconAdjustments size={14} />}
        label="Edit Preferences"
        variant="light"
        onClick={() => setOpened(true)}
      />

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Preference Tags"
        centered
        size="md"
        // overlayBlur={2}
      >
        {loading ? (
          <Group my="xl">
            <Loader />
          </Group>
        ) : (
          <Stack>
            <MultiSelect
              label="Your Tags"
              data={options}
              value={selected}
              onChange={setSelected}
              searchable
              // nothingFound="No tags"
              placeholder="Select tags"
            />

            <Group>
              <Button onClick={handleSave} loading={saving} disabled={saving}>
                Save
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </>
  );
};

export default EditPreferencesModal;
