// components/UserPostList.tsx
import { Badge, Button, Grid, Image, Title } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import CommonLink from "../common/CommonLink";
import { ApiDeletePost } from "@/api/blog"; // ➊ import
import showNotify from "@/utils/notify";

interface UserPostProps {
  userData: any;
  isOwner: boolean;
}

const UserPostList = ({ userData, isOwner }: UserPostProps) => {
  const [posts, setPosts] = useState(userData?.posts ?? []);

  const handleDelete = async (id: string) => {
    try {
      await ApiDeletePost(id);
      showNotify("success", "Deleted successfully!");
      setPosts((prev: any[]) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      showNotify("fail", "Failed to delete post");
    }
  };

  return (
    <section className="my-[4rem] flex flex-col gap-4">
      <div className="flex justify-between items-center mb-6">
        <Title order={3} className="mb-4">
          Posts ({posts.length})
        </Title>

        {isOwner && (
          <CommonLink
            link={`/user/${userData?.username}/add-post`}
            linkLabel="Add Post"
          />
        )}
      </div>

      <Grid gutter="md">
        {posts.map((post: any) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={post.id}>
            <div className="flex flex-col gap-4 bg-[#ffffff] p-4 rounded-lg transform transition-transform duration-300 hover:scale-[1.05]">
              {/* thumbnail + tags */}
              <div className="relative">
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post.image}
                    alt={post.title || "Blog Post Image"}
                    width={1024}
                    height={1024}
                    radius={"md"}
                    className="h-[13rem] w-full object-cover rounded-md"
                  />
                </Link>
                <div className="absolute top-2 right-[-2] flex flex-wrap gap-1"></div>
              </div>

              {/* title */}
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-xl font-semibold line-clamp-1">
                  {post.title}
                </h3>
                <p
                  dangerouslySetInnerHTML={{ __html: post?.description }}
                  className={`mb-4 line-clamp-2 text-sm`}
                />
              </Link>

              <div>
                {post?.tags?.map((tag: any) => (
                  <span
                    key={tag?.id}
                    className="text-sm px-2 bg-secondary rounded-lg text-[#fdfdfd] m-1"
                  >
                    <Link href={`#`}>{tag?.title}</Link>
                  </span>
                ))}
              </div>

              {/* edit & delete */}
              {isOwner && (
                <div className="flex justify-between items-center">
                  <CommonLink
                    link={`/blog/${post.slug}/edit-post`}
                    linkLabel="Edit Post"
                  />

                  <Button
                    variant="filled"
                    color="#F28F3B"
                    radius="md"
                    onClick={() => handleDelete(post.id)}
                    className="px-4 py-2 bg-accent text-[#fefefe] rounded-lg shadow-lg shadow-[#A65418] hover:bg-[#A65418] transition-colors duration-300"
                  >
                    Delete Post
                  </Button>
                </div>
              )}
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </section>
  );
};

export default UserPostList;
