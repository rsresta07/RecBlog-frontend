import { useState, useEffect } from "react";
import { Pagination } from "@mantine/core";
import { ApiGetPost } from "@/api/blog";
import CommonBlogList from "@/components/common/CommonBlogList";
import { useRouter } from "next/router";

/**
 * Splits an array into chunks of a specified size.
 *
 * @param array - The array to be split into chunks.
 * @param size - The size of each chunk.
 * @returns A two-dimensional array where each sub-array is a chunk of the specified size.
 */
function chunk<T>(array: T[], size: number): T[][] {
  return array.length
    ? [array.slice(0, size), ...chunk(array.slice(size), size)]
    : [];
}

/**
 * A component that fetches a list of blog posts from the server, paginates them, and renders them in a grid.
 *
 * @returns A JSX element that renders the paginated grid of blog posts.
 */
const PostPagination = () => {
  const itemsPerPage = 6;
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);

  const [postData, setPostData] = useState<any[]>([]);
  const paginatedPosts = chunk(postData, itemsPerPage);
  const currentPosts = paginatedPosts[activePage - 1] || [];
  const router = useRouter();

  /**
   * Fetches the list of blog posts from the server and updates the state of the component.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
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
    if (!router.isReady) return;
    setLoading(true);
    fetchData();
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timeout);
  }, [router.isReady, activePage]);

  return (
    <main className="container mx-auto mb-[10rem]">
      <h2 className="text-3xl font-bold text-primary mb-[1rem]">
        All Blog Posts
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

export default PostPagination;
