import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  Button,
  Loader,
  FileInput,
  MultiSelect,
  Stack,
  Group,
  Text,
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
type FormValues = {
  title: string;
  description: string;
  image: File | null;
  tagIds: string[];
};

const EditPost = () => {
  const router = useRouter();
  const slug = router?.query?.postSlug as string | undefined;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { title: "", description: "", image: null, tagIds: [] },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState<string | null>(null);
  const [authorSlug, setAuthorSlug] = useState<string | null>(null); // New state for authorSlug

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
        setAuthorSlug(post?.user?.username);
        reset({
          title: post?.title,
          description: post?.content,
          tagIds: post?.tags?.map((t: any) => t.id),
        }); // Use reset to populate form
        setPreviewUrl(post?.image); // show old image
      } catch (err) {
        console.error(err);
        showNotification({ color: "red", message: "Failed to load post." });
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, reset]);

  /* ─ submit ─ */
  const onSubmit = async (data: FormValues) => {
    if (!postId) return;

    try {
      let imageUrl = previewUrl; // keep old if no new file

      if (data.image) {
        imageUrl = await uploadImageToCloudinary(data.image);
      }

      const payload = {
        title: data.title,
        description: data.description,
        tagIds: data.tagIds,
        image: imageUrl, // final URL
      };

      await ApiUpdatePost(postId, payload);
      showNotification({
        color: "green",
        message: "Post updated successfully!",
      });

      // Navigate back to the user's profile using the stored authorSlug
      if (authorSlug) {
        router.push(`/user/${authorSlug}`);
      } else {
        router.push(`/blog/${slug}`); // Fallback to post details if authorSlug is not found
        console.warn(
          "Author slug not found, navigating to post details instead of user profile."
        );
      }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextInput
                label="Title"
                withAsterisk
                {...field}
                error={errors.title?.message}
              />
            )}
          />

          <label className="text-sm font-medium">Description</label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <SunEditor
                defaultValue={field.value}
                onChange={field.onChange}
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
            )}
          />
          {errors.description && (
            <Text c="red" size="xs">
              {errors.description.message}
            </Text>
          )}

          <div className="flex gap-4 w-full items-end">
            {previewUrl && (
              <div className="w-1/3">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={100}
                  height={100}
                  radius="md"
                />
              </div>
            )}

            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <FileInput
                  label="Replace Image (optional)"
                  accept="image/*"
                  value={value}
                  onChange={(file) => {
                    onChange(file);
                    setPreviewUrl(
                      file ? URL.createObjectURL(file) : previewUrl
                    );
                  }}
                  {...rest}
                />
              )}
            />
          </div>

          <Controller
            name="tagIds"
            control={control}
            rules={{ required: "At least one tag is required" }}
            render={({ field }) => (
              <MultiSelect
                label="Tags"
                data={tagOptions}
                searchable
                withAsterisk
                {...field}
                error={errors.tagIds?.message}
              />
            )}
          />

          <Group>
            <Button type="submit">Update Post</Button>
          </Group>
        </Stack>
      </form>
    </div>
  );
};

export default EditPost;
