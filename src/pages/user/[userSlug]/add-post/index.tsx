import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import CommonLogo from "@/components/common/CommonLogo";
import showNotify from "@/utils/notify";
import {
  Grid,
  Button,
  Text,
  TextInput,
  FileInput,
  Input,
  MultiSelect,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APIAddBlog } from "@/api/blog";
import { ApiGetTag } from "@/api/tag";
import { uploadImageToCloudinary } from "@/utils/lib/cloudinaryUpload"; // NEW

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const AddPost = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      tagIds: [] as string[],
      image: null as File | null,
    },
  });

  const router = useRouter();
  const slug = router.query.userSlug as string;
  const [loading, setLoading] = useState(false);
  const [tagData, setTagData] = useState<any[]>([]);

  /* ───────────────── fetch tags ───────────────── */
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

  /* ───────────────── submit ───────────────── */
  const onSubmit = async (data: {
    title: string;
    content: string;
    image: File | null;
    tagIds: string[];
  }) => {
    if (!data.image) return showNotify("error", "Please select an image.");

    setLoading(true);
    try {
      // 1) upload to Cloudinary → url
      const imageUrl = await uploadImageToCloudinary(data.image);

      // 2) build JSON payload
      const payload = {
        title: data.title,
        description: data.content, // field name expected by backend
        image: imageUrl,
        tagIds: data.tagIds,
      };

      // 3) POST to your backend
      const resp = await APIAddBlog(slug, payload); // APIAddBlog must send JSON
      showNotify("success", resp?.message || "Post added successfully!");
      reset();
      router.push(`/user/${slug}`);
    } catch (e: any) {
      console.error(e);
      showNotify("error", "Failed to add post.");
    } finally {
      setLoading(false);
    }
  };

  /* ───────────────── UI ───────────────── */
  return (
    <main className="container mx-auto mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <section className="space-y-6">
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <TextInput
                label="Title"
                placeholder="Your post title"
                withAsterisk
                {...register("title", { required: "Title is required" })}
                error={errors.title?.message?.toString()}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Controller
                name="tagIds"
                control={control}
                rules={{ required: "Select at least one tag" }}
                render={({ field }) => (
                  <MultiSelect
                    label="Tags"
                    placeholder="Choose up to 3"
                    data={tagOptions}
                    maxValues={3}
                    searchable
                    {...field}
                    error={errors.tagIds?.message?.toString()}
                  />
                )}
              />
            </Grid.Col>
          </Grid>

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
                <SunEditor
                  setContents={field.value}
                  onChange={field.onChange}
                  setOptions={{
                    buttonList: [
                      ["undo", "redo"],
                      ["font", "fontSize", "formatBlock"],
                      [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                      ],
                      ["removeFormat"],
                      ["fontColor", "hiliteColor"],
                      ["outdent", "indent"],
                      ["align", "horizontalRule", "list", "table"],
                      ["link", "image", "video"],
                      ["fullScreen", "showBlocks", "codeView"],
                      ["preview", "print"],
                    ],
                  }}
                  height="250px"
                />
              )}
            />
          </Input.Wrapper>

          <Controller
            name="image"
            control={control}
            rules={{ required: "A featured image is required" }}
            render={({ field }) => (
              <FileInput
                label="Featured Image"
                placeholder="Upload an image"
                withAsterisk
                accept="image/*"
                {...field}
                error={errors.image?.message?.toString()}
              />
            )}
          />
        </section>
      </form>
    </main>
  );
};

export default AddPost;
