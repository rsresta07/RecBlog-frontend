import HeroLayout from "@/layouts/HeroLayout";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ApiGetPost, APIGetPostDetails } from "@/api/blog";
import { useEffect, useState } from "react";

const PostDetail = () => {
  const router = useRouter();
  const postSlug = router.query.postSlug as string;
  const [details, setDetails] = useState<any>();
  const [postData, setPostData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogDetails = async () => {
    try {
      const response = await APIGetPostDetails(postSlug);
      const data = response?.data;
      setDetails(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiGetPost();
      setPostData(response?.data);
      console.log("Fetching post data:", response?.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    if (postSlug) {
      fetchBlogDetails();
    }
  }, [postSlug]);
  return (
    <main className="container mx-auto grid grid-cols-10 gap-[4rem] mt-[4rem]">
      <section className="col-span-7 flex flex-col gap-8">
        <span className={`text-purple-700`}>
          {details?.user && (
            <Link href={`/user/${details?.user?.username}`}>
              {details?.user?.fullName}
            </Link>
          )}
          {/*&nbsp;-&nbsp;*/}
          {/*<Link href={`#`}>2025/03/30</Link>*/}
        </span>
        <h2 className={`text-4xl font-bold`}>{details?.title}</h2>
        <div>
          {details?.tags?.map((tag: any) => (
            <span
              key={tag?.id}
              className="px-2 bg-purple-200 rounded-lg text-purple-700 m-1"
            >
              <Link href="#">{tag?.title}</Link>
            </span>
          ))}
        </div>
        <Image
          src={details?.image}
          alt={details?.title}
          width={1024}
          height={1024}
          className="w-auto object-cover"
        />
        <div dangerouslySetInnerHTML={{ __html: details?.content }} />
      </section>
      {/*Recent Blogs*/}
      <section className="col-span-3">
        <h2 className="text-2xl font-bold text-dark-font mb-4">
          Recent blog post
        </h2>
        <div>
          {postData?.slice(0, 6)?.map((post) => (
            <div className={`mb-8`} key={post?.id}>
              <Link href={`/blog/${post?.slug}`}>
                <Image
                  src={post?.image}
                  alt={post?.title}
                  width={2048}
                  height={2048}
                  className="h-[13rem] object-cover"
                />
              </Link>
              <div>
                <span className={`text-purple-700 text-sm`}>
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
                    className={`mb-4 line-clamp-3 text-sm`}
                  />
                </Link>
                {post?.tags?.map((tag: any) => (
                  <span
                    key={tag?.id}
                    className="text-sm px-2 bg-purple-200 rounded-lg text-purple-700 m-1"
                  >
                    <Link href={`#`}>{tag?.title}</Link>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PostDetail;
PostDetail.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
