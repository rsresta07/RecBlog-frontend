import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  Button,
  Loader,
  MultiSelect,
  Stack,
  Group,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ApiAdminUpdatePost, APIGetPostDetailAdmin } from "@/api/blog";
import { ApiGetTag } from "@/api/tag";
import CustomSunEditor from "@/components/common/CommonSunEditor";
import CommonImageUpload from "@/components/common/CommonImageUpload";

type TagOption = { value: string; label: string };

type FormValues = {
  title: string;
  description: string;
  image: File | null;
  tagIds: string[];
};

const AdminEditPost = () => {
  const router = useRouter();

  const postId = router?.query?.postId as string | undefined;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { title: "", description: "", image: null, tagIds: [] },
  });

  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [authorSlug, setAuthorSlug] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  /* ─ fetch data ─ */
  useEffect(() => {
    if (!postId) return;

    setLoading(true); // ensure loader shows on every post switch
    setExistingImageUrl(null); // clear previous post image
    setCurrentImageUrl(null);
    reset(); // clear the form while loading new data

    (async () => {
      try {
        const [{ data: post }, { data: tags }] = await Promise.all([
          APIGetPostDetailAdmin(postId),
          ApiGetTag(),
        ]);

        setTagOptions(
          tags.map((t: any) => ({ value: t?.id, label: t?.title })),
        );
        setCurrentPostId(post?.id);
        setAuthorSlug(post?.user?.slug);
        setExistingImageUrl(post?.image);
        setCurrentImageUrl(post?.image);

        reset({
          title: post?.title,
          description: post?.content,
          tagIds: post?.tags?.map((t: any) => t.id),
          image: null, // leave file input empty
        });
      } catch (err) {
        console.error(err);
        showNotification({ color: "red", message: "Failed to load post." });
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  /**
   * Handles the submission of the edit post form.
   *
   * This function constructs a payload with the updated post details and sends
   * a request to update the post via the API. If the update is successful, it
   * shows a success notification and navigates to the user's profile page. If
   * the update fails, it shows an error notification.
   *
   * @param {FormValues} data - The form data containing the post details.
   */
  const onSubmit = async (data: FormValues) => {
    if (!postId) return;

    try {
      const payload = {
        title: data.title,
        description: data.description,
        tagIds: data.tagIds,
        image: currentImageUrl || existingImageUrl, // Use current image URL or keep existing
      };

      await ApiAdminUpdatePost(postId, payload); // instead of ApiUpdatePost

      showNotification({
        color: "green",
        message: "Post updated successfully!",
      });

      // Navigate back to the user's profile using the stored authorSlug
      router.push("/dashboard/posts");
    } catch (err) {
      console.error(err);
      showNotification({ color: "red", message: "Update failed" });
    }
  };

  /**
   * Updates the current image URL state and the form value for image.
   *
   * @param {string | null} imageUrl - The URL of the new image or null if the image is removed.
   */
  const handleImageChange = (imageUrl: string | null) => {
    setCurrentImageUrl(imageUrl);
    // Update the form value
    setValue("image", imageUrl as any);
  };

  if (loading)
    return <Loader style={{ margin: "4rem auto", display: "block" }} />;

  /* ─ UI ─ */
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Button variant="outline" onClick={() => router.back()}>
        Cancel
      </Button>
      <h1 className="text-2xl font-bold mb-6 mt-6">Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-12">
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
              <CustomSunEditor
                value={field.value}
                onChange={field.onChange}
                error={errors.description?.message}
                // features={["image", "video"]}
              />
            )}
          />
          {errors.description && (
            <Text c="red" size="xs">
              {errors.description.message}
            </Text>
          )}

          {/* Image upload with cropping */}
          <CommonImageUpload
            control={control}
            name="image"
            label="Featured Image"
            errors={errors}
            existingImageUrl={existingImageUrl}
            onImageChange={handleImageChange}
          />

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

export default AdminEditPost;
