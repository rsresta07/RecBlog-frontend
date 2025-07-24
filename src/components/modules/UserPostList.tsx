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
    <section className="mb-[10rem] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-primary text-2xl font-bold">
          Posts ({posts.length})
        </h2>

        {isOwner && (
          <CommonLink
            link={`/user/${userData?.username}/add-post`}
            linkLabel="Add Post"
          />
        )}
      </div>
      <section className="grid grid-cols-3">
        {posts.map((post: any) => (
          <div key={post.id}>
            <div className="flex flex-col gap-4 p-4 rounded-lg transform transition-transform duration-300 hover:scale-[1.05]">
              {/* thumbnail + tags */}
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
          </div>
        ))}
      </section>
    </section>
  );
};

export default UserPostList;
