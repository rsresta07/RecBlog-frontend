import CommonBlogList from "@/components/common/CommonBlogList";
import CommonLoader from "@/components/common/CommonLoader";
import { AdminDashboardLayout } from "@/layouts/AdminDashboardLayout";
import { useState, useEffect } from "react";
import { ApiDeletePost, ApiGetAllPost } from "@/api/blog";
import { Pagination, Switch, Text } from "@mantine/core";
import Link from "next/link";

/**
 * Splits an array into chunks of a specified size.
 *
 * @template T - The type of elements in the array.
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
 * AdminPost component renders a list of blog posts with pagination
 * and a delete button for each post.
 *
 * @param {{ limit: number }} props - The number of posts to display per page.
 *
 * @returns A main container with blog posts displayed in a grid layout.
 */
const AdminPost = ({ limit }: any) => {
  const itemsPerPage = 30;
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);
  const [postData, setPostData] = useState<any[]>([]);
  const paginatedPosts = chunk(postData, itemsPerPage);
  const currentPosts = paginatedPosts[activePage - 1] || [];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiGetAllPost();
      setPostData(response?.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles deleting a post by ID.
   * @param {string} id - The ID of the post to be deleted.
   *
   * @async
   * @function
   */
  const handleDeletePost = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmDelete) return;

    try {
      await ApiDeletePost(id);
      fetchData(); // refresh post list
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Failed to delete post.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="bg-light-bg">
      <section className={`grid grid-cols-12 gap-8`}>
        {loading ? (
          <CommonLoader />
        ) : currentPosts.length === 0 ? (
          <div className="flex justify-center items-center">
            <h2>No post found</h2>
          </div>
        ) : (
          currentPosts?.slice(0, limit)?.map((post) => (
            <div
              key={post.id}
              className="col-span-4"
              // transform transition-transform duration-300 hover:scale-[1.05]
            >
              <CommonBlogList post={post} />

              <div className={`flex justify-between items-center`}>
                <Link href={`/dashboard/posts/${post.id}/edit`}>
                  <button className="px-4 py-2 bg-secondary text-[#fefefe] rounded-lg shadow-lg shadow-primary hover:bg-primary transition-colors duration-300">
                    Edit
                  </button>
                </Link>

                <div className="flex items-center gap-2">
                  <text className={`text-primary`}>
                    {post.status ? "Active" : "Inactive"}
                  </text>

                  {/* Toggle Button */}
                  <Switch
                    checked={post.status} // assuming status is boolean
                    onChange={async () => {
                      try {
                        await ApiDeletePost(post.id); // your toggle API call
                        fetchData(); // refresh after toggle
                      } catch (err) {
                        console.error("Failed to toggle post status:", err);
                        alert("Failed to toggle post status.");
                      }
                    }}
                    size="md"
                  />
                </div>
              </div>
            </div>
          ))
        )}
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
    </main>
  );
};

export default AdminPost;

/**
 * AdminPost.getLayout()
 *
 * A function that returns a layout that wraps the AdminPost component with the AdminDashboardLayout component.
 *
 * @param {any} page - The page component to be wrapped.
 *
 * @returns {JSX.Element} A JSX element that wraps the AdminPost component.
 */
AdminPost.getLayout = (page: any) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
