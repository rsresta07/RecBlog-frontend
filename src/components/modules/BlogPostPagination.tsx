import { useState, useEffect } from "react";
import { Pagination } from "@mantine/core";
import posts from "@/utils/mock/posts.json";
import Link from "next/link";
import Image from "next/image";
import CommonLoader from "../common/CommonLoader";
import { ApiGetPost } from "@/api/blog";
import CommonBlogList from "@/components/common/CommonBlogList";

function chunk<T>(array: T[], size: number): T[][] {
  return array.length
    ? [array.slice(0, size), ...chunk(array.slice(size), size)]
    : [];
}

const PostPagination = () => {
  const itemsPerPage = 6;
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);

  const [postData, setPostData] = useState<any[]>([]);
  const paginatedPosts = chunk(postData, itemsPerPage);
  const currentPosts = paginatedPosts[activePage - 1] || [];

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
    setLoading(true);
    fetchData();
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timeout);
  }, [activePage]);

  return (
    <main className="container mx-auto my-12">
      <h2 className="text-2xl font-bold text-darkFontColor mb-4">
        All Blog Posts
      </h2>
      <section>
        <section className="grid grid-cols-12 gap-8">
          {currentPosts?.map((post) => <CommonBlogList post={post} />)}
        </section>
        <div className="flex justify-center mt-4">
          <Pagination
            total={paginatedPosts.length}
            siblings={2}
            value={activePage}
            onChange={setPage}
            mt="sm"
          />
        </div>
      </section>
    </main>
  );
};

export default PostPagination;
