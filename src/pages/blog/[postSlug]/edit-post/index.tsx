import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  TextInput,
  Button,
  Loader,
  FileInput,
  MultiSelect,
  Stack,
  Group,
  Image,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { APIGetPostDetails, ApiUpdatePost } from "@/api/blog";
import { ApiGetTag } from "@/api/tag";
import { uploadImageToCloudinary } from "@/utils/lib/cloudinaryUpload";
import dynamic from "next/dynamic";
const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });
import "suneditor/dist/css/suneditor.min.css";

type TagOption = { value: string; label: string };

const EditPost = () => {
  const router = useRouter();
  const slug = router?.query?.postSlug as string | undefined;

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null as File | null,
    tagIds: [] as string[],
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState<string | null>(null);

  /* ─ fetch data ─ */
  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const { data: post } = await APIGetPostDetails(slug);
        const { data: tags } = await ApiGetTag();

        setTagOptions(
          tags.map((t: any) => ({ value: t?.id, label: t?.title }))
        );

        setPostId(post?.id);
        setForm({
          title: post?.title,
          description: post?.content,
          image: null,
          tagIds: post?.tags?.map((t: any) => t.id),
        });
        setPreviewUrl(post?.image); // show old image
      } catch (err) {
        console.error(err);
        showNotification({ color: "red", message: "Failed to load post." });
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  /* ─ helpers ─ */
  const setField = (field: keyof typeof form) => (value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleImageChange = (file: File | null) => {
    setField("image")(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : previewUrl);
  };

  /* ─ submit ─ */
  const handleSubmit = async () => {
    if (!postId) return;

    try {
      let imageUrl = previewUrl; // keep old if no new file

      if (form?.image) imageUrl = await uploadImageToCloudinary(form?.image);

      const payload = {
        title: form?.title,
        description: form?.description,
        tagIds: form?.tagIds,
        image: imageUrl, // final URL
      };

      await ApiUpdatePost(postId, payload); // plain JSON
      showNotification({ color: "green", message: "Post updated!" });
      router.push(`/blog/${slug}`); // Routes to the detail page of the updated post
    } catch (err) {
      console.error(err);
      showNotification({ color: "red", message: "Update failed" });
    }
  };

  if (loading)
    return <Loader style={{ margin: "4rem auto", display: "block" }} />;

  /* ─ UI ─ */
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

      <Stack>
        <TextInput
          label="Title"
          value={form?.title}
          onChange={(e) => setField("title")(e?.currentTarget?.value)}
          required
        />

        <label className="text-sm font-medium">Description</label>
        <SunEditor
          defaultValue={form?.description}
          onChange={(html) => setField("description")(html)}
          height="250px"
          setOptions={{
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["bold", "underline", "italic", "strike"],
              ["removeFormat"],
              ["fontColor", "hiliteColor"],
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "table"],
              ["link", "image", "video"],
              ["fullScreen", "showBlocks", "codeView"],
              ["preview", "print"],
            ],
          }}
        />

        <div className="flex items-center gap-4">
          {previewUrl && (
            <Image src={previewUrl} alt="Preview" width={100} radius="md" />
          )}

          <FileInput
            label="Replace Image (optional)"
            accept="image/*"
            value={form?.image}
            onChange={handleImageChange}
          />
        </div>

        <MultiSelect
          label="Tags"
          data={tagOptions}
          value={form?.tagIds}
          onChange={setField("tagIds")}
          searchable
        />

        <Group>
          <Button onClick={handleSubmit}>Update Post</Button>
        </Group>
      </Stack>
    </div>
  );
};

export default EditPost;
