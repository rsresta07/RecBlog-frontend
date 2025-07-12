import { useState, useEffect } from "react";
import { Pagination } from "@mantine/core";
import { ApiGetPost, APIGetRecommendedPosts } from "@/api/blog";
import CommonBlogList from "@/components/common/CommonBlogList";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/hooks/useAuth"; // <-- import useAuth
import { APIGetRawRecommendedPosts } from "@/api/blog";

function chunk<T>(array: T[], size: number): T[][] {
  return array.length
    ? [array.slice(0, size), ...chunk(array.slice(size), size)]
    : [];
}

const RecommendedBlog = () => {
  const itemsPerPage = 6;
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);

  const [postData, setPostData] = useState<any[]>([]);
  const paginatedPosts = chunk(postData, itemsPerPage);
  const currentPosts = paginatedPosts[activePage - 1] || [];

  const router = useRouter();
  const { user } = useAuth(); // <-- get logged-in user
  const userId = user?.id;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await APIGetRawRecommendedPosts();
      const allPosts = response?.data || [];

      const filteredPosts = userId
        ? allPosts.filter((post: any) => post.user?.id !== userId)
        : allPosts;

      setPostData(filteredPosts);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    fetchData();
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timeout);
  }, [router.isReady, activePage]);

  if (!postData.length && !loading) return null;

  return (
    <main className="container mx-auto my-[6rem]">
      <h2 className="text-4xl font-bold text-primary mb-[2rem]">
        Recommended For You
      </h2>
      <section>
        <section className="grid grid-cols-12 gap-8">
          {currentPosts?.map((post) => (
            <div
              key={post?.id}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 transform transition-transform duration-300 hover:scale-[1.05]"
            >
              <CommonBlogList post={post} />
            </div>
          ))}
        </section>
        <div className="flex justify-center mt-4">
          <Pagination
            total={paginatedPosts.length}
            siblings={2}
            value={activePage}
            onChange={setPage}
            mt="sm"
            color="secondary-color"
          />
        </div>
      </section>
    </main>
  );
};

export default RecommendedBlog;
