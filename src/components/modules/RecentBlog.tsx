import Image from "next/image";
import blogPosts from "@/utils/mock/posts.json";
import Link from "next/link";

const BlogPostVertical = ({ post }: any) => {
  return (
    <div className="grid grid-rows-2 gap-8">
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

const BlogPostHorizontal = ({
  post,
  imageHeight = "11rem",
  lineClamp = 3,
  gap = "8",
}: any) => {
  return (
    <div className={`grid grid-cols-2 gap-${gap}`}>
      <Image
        src={post.image}
        alt={post.title}
        width={1024}
        height={1024}
        className={`h-[${imageHeight}] object-cover`}
      />
      <div>
        <span className="text-purple-700 text-sm">
          {post.author} - {post.date}
        </span>
        <h3 className="text-2xl">{post.title}</h3>
        <p className={`mb-4 ${lineClamp ? `line-clamp-${lineClamp}` : ""}`}>
          {post.description}
        </p>
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
                imageHeight="11rem"
                lineClamp={3}
                gap="8"
              />
            ))}
          </div>
        </div>
        <div className="col-span-10">
          <BlogPostHorizontal
            post={blogPosts[3]}
            imageHeight="14rem"
            lineClamp={5}
            gap="4"
          />
        </div>
      </div>
    </main>
  );
};

export default RecentBlog;
