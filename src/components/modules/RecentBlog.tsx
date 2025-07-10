import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ApiGetPost } from "@/api/blog";

const BlogPostVertical = ({ post }: any) => {
  return (
    <div className="flex flex-col gap-4 transform transition-transform duration-300 hover:scale-[1.05]">
      <Link href={`/blog/${post?.slug}`}>
        <Image
          src={post?.image || "/vercel.svg"}
          alt={post?.title || "Blog Post Image"}
          width={1024}
          height={1024}
          className="h-[13rem] object-cover rounded-lg"
        />
      </Link>
      <div>
        <span className="text-primary text-sm">
          {post?.user && (
            <Link href={`/user/${post?.user?.slug}`}>
              {post?.user?.fullName}
            </Link>
          )}
          {/*- {post.date}*/}
        </span>
        <Link href={`/blog/${post?.slug}`}>
          <h3 className="text-2xl font-bold line-clamp-2 text-primary">
            {post?.title}
          </h3>
          <p
            dangerouslySetInnerHTML={{ __html: post?.content }}
            className={`mb-4 line-clamp-3`}
          />
        </Link>
        {post?.tags?.map((tag: any) => (
          <span
            key={tag?.id}
            className="text-sm px-2 bg-secondary rounded-lg text-[#fdfdfd] m-1"
          >
            <Link href={`#`}>{tag?.title}</Link>
          </span>
        ))}
      </div>
    </div>
  );
};

const BlogPostHorizontal = ({ post, imageHeight }: any) => {
  return (
    <div className="grid grid-cols-2 gap-8 transform transition-transform duration-300 hover:scale-[1.05]">
      <Link href={`/blog/${post?.slug}`}>
        <Image
          src={post?.image || "/vercel.svg"}
          alt={post?.title || "Blog Post Image"}
          width={1024}
          height={1024}
          className={`${imageHeight} w-full object-cover rounded-lg`}
        />
      </Link>
      <div>
        <span className="text-primary text-sm">
          {post?.user && (
            <Link href={`/user/${post?.user?.slug}`}>
              {post?.user?.fullName}
            </Link>
          )}
          {/*- {post.date}*/}
        </span>
        <Link href={`/blog/${post?.slug}`}>
          <h3 className="text-2xl font-bold line-clamp-1 text-primary">
            {post?.title}
          </h3>
          <p
            dangerouslySetInnerHTML={{ __html: post?.content }}
            className={`mb-4 line-clamp-3`}
          />
        </Link>
        {post?.tags?.map((tag: any) => (
          <span
            key={tag?.id}
            className="text-sm px-2 bg-secondary rounded-lg text-[#fdfdfd] m-1"
          >
            <Link href="#">{tag?.title}</Link>
          </span>
        ))}
      </div>
    </div>
  );
};

const RecentBlog = () => {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiGetPost();
      setPostData(response?.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="container mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Recent blog posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        <div className="col-span-5">
          <BlogPostVertical post={postData[0]} />
        </div>
        <div className="col-span-5">
          <div className="grid gap-8">
            {postData.slice(1, 3).map((post: any) => (
              <BlogPostHorizontal
                key={post.id}
                post={post}
                imageHeight="h-[11rem]"
              />
            ))}
          </div>
        </div>
        <div className="col-span-10">
          <BlogPostHorizontal post={postData[3]} imageHeight="h-[16rem]" />
        </div>
      </div>
    </main>
  );
};

export default RecentBlog;
