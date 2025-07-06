import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Title,
  MultiSelect,
  Button,
  Loader,
  Group,
  Stack,
} from "@mantine/core";
import { ApiGetPreferences, ApiUpdatePreferences } from "@/api/user";
import { ApiGetTag } from "@/api/tag";
import showNotify from "@/utils/notify";

const PreferencesPage = () => {
  const router = useRouter();
  const { userSlug } = router.query as { userSlug?: string };

  const [allTags, setAllTags] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: tags }, { data: prefs }] = await Promise.all([
          ApiGetTag(),
          ApiGetPreferences(),
        ]);
        setAllTags(tags.map((t: any) => ({ value: t.id, label: t.title })));
        setSelected(prefs.map((t: any) => t.id));
      } catch (err) {
        showNotify("error", "Failed to load tags");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await ApiUpdatePreferences(selected);
      showNotify("success", "Preferences updated");
      router.push(`/user/${userSlug}`);
    } catch (err) {
      showNotify("error", "Could not save preferences");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Group mt="xl">
        <Loader />
      </Group>
    );

  return (
    <Container size="xs" mt="xl">
      <Title order={3} mb="md">
        Choose Your Preference Tags
      </Title>

      <Stack>
        <MultiSelect
          data={allTags}
          value={selected}
          onChange={setSelected}
          searchable
          // nothingFound="No tags"
          placeholder="Select tags you care about"
        />

        <Group>
          <Button
            color="primary-btn"
            variant="light"
            onClick={handleSave}
            loading={saving}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default PreferencesPage;
