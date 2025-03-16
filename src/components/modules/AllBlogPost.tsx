import Image from "next/image";
import posts from "@/utils/mock/posts.json"
import {useState} from "react";
import CommonLoader from "@/components/common/CommonLoader";
import Link from "next/link";

// Display Cards of the Blog
// TODO: Make the links work
const AllBlogPost = ({limit}: any) => {

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // const response = await APIFilterProducts(selectedFilters);
      // setProducts(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    setLoading(false);
  };

  return (
    <main className="container mx-auto my-12">
      <h2 className="text-2xl font-bold text-darkFontColor mb-4">All Blog Posts</h2>

      <section className={`grid grid-cols-12 gap-8`}>
        {loading ? (
          <CommonLoader/>
        ) : posts.length === 0 ? (
          <div className="flex justify-center items-center">
            <h2>No post found</h2>
          </div>
        ) : (
          posts?.slice(0, limit)?.map((post) => (
            <div className={`col-span-4 grid grid-row-2 gap-8`} key={post?.id}>
              <Link href={`#`}>
                <Image src={post?.image} alt={post?.title} width={1024} height={1024}
                       className="h-[13rem] object-cover"/>
              </Link>
              <div>
                <span className={`text-purple-700 text-sm`}>
                  <Link href={`#`}>{post?.author}</Link>
                  -
                  <Link href={`#`}>{post?.date}</Link>
                </span>
                <Link href={`#`}>
                  <h3 className={`text-xl line-clamp-1`}>{post?.title}</h3>
                  <p className={`mb-4 line-clamp-2 text-sm`}>{post?.description}</p>
                </Link>
                {post?.tag?.map((tag) => (
                  <span
                    key={tag?.id}
                    className="text-sm px-2 bg-purple-200 rounded-lg text-purple-700 m-1"
                  >
                    <Link href={`#`}>{tag?.title}</Link>
                </span>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  )
}

export default AllBlogPost;