import Link from "next/link";
import Image from "next/image";

const CommonBlogList = ({ post }: any) => {
  return (
    <div
      className={`col-span-4 grid grid-row-2 gap-4 bg-light-bg p-2 rounded-lg`}
      key={post?.id}
    >
      <Link href={`/blog/${post?.slug}`}>
        <Image
          src={post?.image}
          alt={post?.title}
          width={1024}
          height={1024}
          className="h-[18rem] object-cover rounded-lg"
        />
      </Link>
      <div>
        <span className={`text-btn-text text-sm text-primary`}>
          {post?.user && (
            <Link href={`/user/${post?.user?.slug}`}>
              {post?.user?.fullName}
            </Link>
          )}
          {/*&nbsp;-&nbsp;*/}
          {/*<Link href={`#`}>{post?.date}</Link>*/}
        </span>
        <Link href={`/blog/${post?.slug}`}>
          <h3 className={`text-xl line-clamp-1 text-primary font-bold`}>
            {post?.title}
          </h3>
          <p
            dangerouslySetInnerHTML={{ __html: post?.content }}
            className={`mb-4 line-clamp-2 text-sm text-[#1e1e1e]`}
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

export default CommonBlogList;
