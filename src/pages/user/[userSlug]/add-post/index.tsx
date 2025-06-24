import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import imageCompression from "browser-image-compression";
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
import { ApiGetUser } from "@/api/user";
import { APIAddBlog } from "@/api/blog";
import { ApiGetTag } from "@/api/tag";

// Dynamically import SunEditor as it's not SSR-compatible
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

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
      tagIds: [] as string[], // Add tagIds to form state
      image: null as File | null,
    },
  });

  const router = useRouter();
  const slug = router.query.userSlug as string;
  const [loading, setLoading] = useState(false);
  const [tagData, setTagData] = useState<any[]>([]);

  // Prepare tag options for MultiSelect
  const tagOptions = tagData.map((tag) => ({
    value: tag.id,
    label: tag.title,
  }));

  const fetchTagData = async () => {
    setLoading(true);
    try {
      const response = await ApiGetTag();
      setTagData(response?.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTagData();
  }, []);

  const onSubmit = async (data: {
    title: string;
    content: string;
    image: File | null;
    tagIds: string[]; // Update data type to include tagIds
  }) => {
    if (!data.image) {
      console.error("Please select an image.");
      return;
    }

    const compressionOptions = {
      maxSizeMB: 1, // Max file size in MB
      maxWidthOrHeight: 1920, // Max width or height
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(
        data.image,
        compressionOptions
      );

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.content); // Assuming backend expects 'description' for content
      formData.append("image", compressedFile, compressedFile.name); // Append the compressed file
      formData.append("tagIds", JSON.stringify(data.tagIds)); // Send tagIds as a JSON string

      console.log(
        "FormData prepared for submission. You can now send it to your API."
      );

      try {
        const resp = await APIAddBlog(slug, formData);
        showNotify("success", resp?.message || "Post added successfully!");
        reset();
        router.push(`/user/${slug}`); // Navigate back to user profile after successful post
      } catch (e: any) {
        showNotify("error", e);
      }
    } catch (error) {
      console.error(
        "Error during image compression or form submission:",
        error
      );
    }
  };

  return (
    <main className="container mx-auto mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex justify-between items-center mb-8">
          <div className="flex gap-6 items-end">
            <CommonLogo />
            <Text>Draft</Text>
          </div>
          <div className="flex gap-6 items-center">
            <Button type="submit" radius={"xl"} color="dark">
              Publish
            </Button>
            <Text>Profile</Text>
          </div>
        </section>
        <section className="space-y-6">
          <Grid gutter="md">
            {/* Use Mantine Grid for layout */}
            <Grid.Col span={{ base: 12, md: 8 }}>
              {/* Title takes 2/3 width on medium and up */}
              <TextInput
                label="Title"
                placeholder="Your post title"
                withAsterisk
                {...register("title", { required: "Title is required" })}
                error={errors.title?.message?.toString()}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              {/* Tags takes 1/3 width on medium and up */}
              <Controller
                name="tagIds"
                control={control}
                rules={{ required: "At least one tag is required" }}
                render={({ field }) => (
                  <MultiSelect
                    label="Tags"
                    placeholder="Select tags for your post"
                    data={tagOptions}
                    maxValues={3}
                    {...field} // Spreads value and onChange
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
              rules={{ required: "Content is required." }}
              render={({ field }) => (
                <SunEditor
                  setOptions={{
                    // height: 200,
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
                  onChange={field.onChange}
                  setContents={field.value}
                />
              )}
            />
          </Input.Wrapper>

          <Controller
            name="image"
            control={control}
            rules={{ required: "A featured image is required" }}
            render={({ field: { onChange, value } }) => (
              <FileInput
                label="Featured Image"
                placeholder="Upload an image"
                withAsterisk
                value={value}
                onChange={onChange}
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
