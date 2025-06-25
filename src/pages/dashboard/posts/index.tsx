import CommonBlogList from "@/components/common/CommonBlogList";
import CommonLoader from "@/components/common/CommonLoader";
import { AdminDashboardLayout } from "@/layouts/AdminDashboardLayout";
import { useState, useEffect } from "react";
import { ApiDeletePost, ApiGetAllPost, ApiGetPost } from "@/api/blog";
import { Pagination } from "@mantine/core";

function chunk<T>(array: T[], size: number): T[][] {
  return array.length
    ? [array.slice(0, size), ...chunk(array.slice(size), size)]
    : [];
}

const AdminPost = ({ limit }: any) => {
  const itemsPerPage = 30;
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);
  const [postData, setPostData] = useState<any[]>([]);
  const paginatedPosts = chunk(postData, itemsPerPage);
  const currentPosts = paginatedPosts[activePage - 1] || [];

  // Function to fetch post data
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

  const handleDeletePost = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
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
    <main>
      <section className={`grid grid-cols-12 gap-8`}>
        {loading ? (
          <CommonLoader />
        ) : currentPosts.length === 0 ? (
          <div className="flex justify-center items-center">
            <h2>No post found</h2>
          </div>
        ) : (
          currentPosts?.slice(0, limit)?.map((post) => (
            <div key={post.id} className="relative col-span-4">
              {/* Render Blog Post */}
              <CommonBlogList post={post} />

              {/* Delete Button */}
              <button
                onClick={() => handleDeletePost(post.id)}
                className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded shadow"
              >
                Delete
              </button>
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

AdminPost.getLayout = (page: any) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
