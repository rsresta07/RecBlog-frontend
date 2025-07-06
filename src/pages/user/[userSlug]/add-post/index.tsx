import { useForm, Controller } from "react-hook-form";
import "suneditor/dist/css/suneditor.min.css";
import CommonLogo from "@/components/common/CommonLogo";
import showNotify from "@/utils/notify";
import {
  Grid,
  Button,
  Text,
  TextInput,
  Input,
  MultiSelect,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APIAddBlog } from "@/api/blog";
import { ApiGetTag } from "@/api/tag";
import CustomSunEditor from "@/components/common/CommonSunEditor";
import CommonImageUpload from "@/components/common/CommonImageUpload";

type FormValues = {
  title: string;
  content: string;
  tagIds: string[];
  image: File | null;
};

const AddPost = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      content: "",
      tagIds: [],
      image: null,
    },
  });

  const router = useRouter();
  const slug = router.query.userSlug as string;

  const [loading, setLoading] = useState(false);
  const [tagData, setTagData] = useState<any[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  /* ───────────── fetch tags ───────────── */
  useEffect(() => {
    (async () => {
      try {
        const res = await ApiGetTag();
        setTagData(res.data);
      } catch (e) {
        console.error("Failed to fetch tags", e);
      }
    })();
  }, []);

  const tagOptions = tagData.map((t) => ({ value: t.id, label: t.title }));

  /* ───────────── submit ───────────── */
  const onSubmit = async (data: FormValues) => {
    if (!uploadedImageUrl) {
      return showNotify("error", "Please select and upload an image.");
    }

    setLoading(true);
    try {
      const payload = {
        title: data.title,
        description: data.content,
        image: uploadedImageUrl, // Use the uploaded image URL
        tagIds: data.tagIds,
      };

      const resp = await APIAddBlog(slug, payload);
      showNotify("success", resp?.message || "Post added successfully!");

      // Reset form and state
      reset();
      setUploadedImageUrl(null);

      router.push(`/user/${slug}`);
    } catch (e: any) {
      console.error(e);
      showNotify("error", "Failed to add post.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (imageUrl: string | null) => {
    setUploadedImageUrl(imageUrl);
    // Update the form value for validation
    setValue("image", imageUrl as any);
  };

  /* ───────────── UI ───────────── */
  return (
    <main className="container mx-auto mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Top bar */}
        <section className="flex justify-between items-center mb-8">
          <div className="flex gap-6 items-end">
            <CommonLogo />
            <Text>Draft</Text>
          </div>
          <div className="flex gap-6 items-center">
            <Button type="submit" radius="xl" color="dark" loading={loading}>
              Publish
            </Button>
            <Text>Profile</Text>
          </div>
        </section>

        {/* Form body */}
        <section className="space-y-6 mb-12">
          {/* Title & Tags */}
          <div className="flex w-full gap-6">
            <TextInput
              label="Title"
              placeholder="Your post title"
              withAsterisk
              className="w-2/4"
              {...register("title", { required: "Title is required" })}
              error={errors.title?.message?.toString()}
            />

            <Controller
              name="tagIds"
              control={control}
              rules={{ required: "Select at least one tag" }}
              render={({ field }) => (
                <MultiSelect
                  label="Tags"
                  className="w-2/4"
                  placeholder="Choose up to 3"
                  data={tagOptions}
                  maxValues={3}
                  searchable
                  withAsterisk
                  {...field}
                  error={errors.tagIds?.message?.toString()}
                />
              )}
            />
          </div>

          {/* Content */}
          <Input.Wrapper
            id="content-editor"
            label="Content"
            withAsterisk
            error={errors.content?.message?.toString()}
          >
            <Controller
              name="content"
              control={control}
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <CustomSunEditor
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.content?.message}
                  // features={["image", "video"]}
                />
              )}
            />
          </Input.Wrapper>

          {/* Featured image with cropping */}
          <div className="w-[25rem]">
            <CommonImageUpload
              control={control}
              name="image"
              label="Featured Image"
              rules={{ required: "A featured image is required" }}
              errors={errors}
              required={true}
              onImageChange={handleImageChange}
            />
          </div>
        </section>
      </form>
    </main>
  );
};

export default AddPost;
