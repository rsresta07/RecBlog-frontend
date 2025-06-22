import Link from "next/link";
import Image from "next/image";

const CommonBlogList = ({ post }: any) => {
  return (
    <div className={`col-span-4 grid grid-row-2 gap-4`} key={post?.id}>
      <Link href={`/blog/${post?.slug}`}>
        <Image
          src={post?.image}
          alt={post?.title}
          width={1024}
          height={1024}
          className="h-[13rem] object-cover"
        />
      </Link>
      <div>
        <span className={`text-btn-text text-sm`}>
          {post?.users?.[0] && (
            <Link href={`/user/${post?.users[0]?.slug}`}>
              {post?.users[0]?.fullName}
            </Link>
          )}
          {/*&nbsp;-&nbsp;*/}
          {/*<Link href={`#`}>{post?.date}</Link>*/}
        </span>
        <Link href={`/blog/${post?.slug}`}>
          <h3 className={`text-xl line-clamp-1`}>{post?.title}</h3>
          <p
            dangerouslySetInnerHTML={{ __html: post?.content }}
            className={`mb-4 line-clamp-2 text-sm`}
          />
        </Link>
        {post?.tags?.map((tag: any) => (
          <span
            key={tag?.id}
            className="text-sm px-2 bg-primary-btn rounded-lg text-btn-text m-1"
          >
            <Link href={`#`}>{tag?.title}</Link>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CommonBlogList;
