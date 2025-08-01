import Link from "next/link";
import Image from "next/image";
import SidebarSkeleton from "./CommonListSkeleton";
import sanitizeHtml from "sanitize-html";

const CommonBlogList = ({ post, loading }: any) => {
  if (loading || !post) return <SidebarSkeleton />;

  const cleanHtml = sanitizeHtml(post.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags,
    allowedAttributes: {
      "*": ["href", "src", "alt"], // allow minimal useful stuff
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      "*": (tagName, attribs) => {
        // strip style attributes completely
        delete attribs.style;
        return { tagName, attribs };
      },
    },
  });

  return (
    <div
      className="w-full h-full bg-light-bg p-4 rounded-lg flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      key={post?.id}
    >
      <div className="overflow-hidden rounded-lg flex-shrink-0 mb-4">
        <Link href={`/blog/${post?.slug}`}>
          <Image
            src={post?.image}
            alt={post?.title}
            width={1024}
            height={1024}
            className="w-full h-[18rem] object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
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
          <h3 className={`text-lg line-clamp-1 text-primary font-bold`}>
            {post?.title}
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
            className="mb-4 text-[#1e1e1e] text-sm [&_*]:text-sm [&_*]:m-0 line-clamp-2"
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
