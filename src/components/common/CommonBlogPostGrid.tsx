import { useEffect, useState } from "react";
import CommonBlogList from "@/components/common/CommonBlogList";
import { Pagination } from "@mantine/core";

function chunk<T>(array: T[], size: number): T[][] {
  return array.length
    ? [array.slice(0, size), ...chunk(array.slice(size), size)]
    : [];
}

interface BlogPostGridProps {
  fetchFunction: () => Promise<any>;
  title: string;
  limit?: number;
  itemsPerPage?: number;
}

const BlogPostGrid = ({
  fetchFunction,
  title,
  limit,
  itemsPerPage = 60,
}: BlogPostGridProps) => {
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);
  const [postData, setPostData] = useState<any[]>([]);
  const paginatedPosts = chunk(postData, itemsPerPage);
  const currentPosts = paginatedPosts[activePage - 1] || [];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchFunction();
      setPostData(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-primary mb-4">{title}</h2>

      <section className="grid grid-cols-12 gap-8">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4"
              >
                <CommonBlogList loading />
              </div>
            ))
          : currentPosts?.slice(0, limit)?.map((post) => (
              <div
                key={post.id}
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
        />
      </div>
    </section>
  );
};

export default BlogPostGrid;
