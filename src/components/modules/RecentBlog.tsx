import Image from "next/image";
import blogPosts from "@/utils/mock/posts.json";
import Link from "next/link";

const BlogPostVertical = ({ post }: any) => {
  return (
    <div className="flex flex-col gap-8">
      <Image
        src={post.image}
        alt={post.title}
        width={1024}
        height={1024}
        className="h-[13rem] object-cover"
      />
      <div>
        <span className="text-purple-700 text-sm">
          {post.author} - {post.date}
        </span>
        <h3 className="text-2xl">{post?.title}</h3>
        <p className="mb-4 line-clamp-4">{post?.description}</p>
        {post?.tag?.map((tag: any) => (
          <span
            key={tag?.id}
            className="text-sm px-2 bg-purple-200 rounded-lg text-purple-700 m-1"
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
    <div className="grid grid-cols-2 gap-8">
      <Image
        src={post.image}
        alt={post.title}
        width={1024}
        height={1024}
        className={`${imageHeight} w-full object-cover`}
      />
      <div>
        <span className="text-purple-700 text-sm">
          {post.author} - {post.date}
        </span>
        <h3 className="text-2xl">{post.title}</h3>
        <p className="mb-4 line-clamp-3">{post.description}</p>
        {post?.tag?.map((tag: any) => (
          <span
            key={tag?.id}
            className="text-sm px-2 bg-purple-200 rounded-lg text-purple-700 m-1"
          >
            <Link href="#">{tag?.title}</Link>
          </span>
        ))}
      </div>
    </div>
  );
};

const RecentBlog = () => {
  return (
    <main className="container mx-auto">
      <h2 className="text-2xl font-bold text-darkFontColor mb-4">
        Recent blog posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        <div className="col-span-5">
          <BlogPostVertical post={blogPosts[0]} />
        </div>
        <div className="col-span-5">
          <div className="grid gap-8">
            {blogPosts.slice(1, 3).map((post: any) => (
              <BlogPostHorizontal
                key={post.id}
                post={post}
                imageHeight="h-[11rem]"
              />
            ))}
          </div>
        </div>
        <div className="col-span-10">
          <BlogPostHorizontal post={blogPosts[3]} imageHeight="h-[16rem]" />
        </div>
      </div>
    </main>
  );
};

export default RecentBlog;
