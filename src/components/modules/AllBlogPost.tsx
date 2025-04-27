import Image from "next/image";
import posts from "@/utils/mock/posts.json";
import { useEffect, useState } from "react";
import CommonLoader from "@/components/common/CommonLoader";
import Link from "next/link";
import { ApiGetPost } from "@/api/blog";
import CommonBlogList from "@/components/common/CommonBlogList";

// Display Cards of the Blog
// TODO: Make the links work
const AllBlogPost = ({ limit }: any) => {
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
    <main className="container mx-auto my-12">
      <h2 className="text-2xl font-bold text-darkFontColor mb-4">
        All Blog Posts
      </h2>

      <section className={`grid grid-cols-12 gap-8`}>
        {loading ? (
          <CommonLoader />
        ) : posts.length === 0 ? (
          <div className="flex justify-center items-center">
            <h2>No post found</h2>
          </div>
        ) : (
          postData
            ?.slice(0, limit)
            ?.map((post) => <CommonBlogList post={post} />)
        )}
      </section>
    </main>
  );
};

export default AllBlogPost;
