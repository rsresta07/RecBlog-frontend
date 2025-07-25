import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/hooks/useAuth";
import { APIFinalRecommendedPosts } from "@/api/recommendation";

/**
 * A custom hook that fetches and paginates recommended posts for the user.
 *
 * This hook retrieves a list of recommended posts using the `APIFinalRecommendedPosts`
 * function and paginates the results based on the specified number of items per page.
 * It filters out posts created by the current user.
 *
 * @param {number} [itemsPerPage=6] - The number of posts to display per page.
 *
 * @returns {Object} An object containing:
 * - `currentPosts`: The current page's posts.
 * - `totalPages`: The total number of pages.
 * - `activePage`: The current active page number.
 * - `setPage`: A function to set the active page.
 * - `loading`: A boolean indicating if the data is being loaded.
 */
export function useRecommendedPosts(itemsPerPage: number = 6) {
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);
  const [postData, setPostData] = useState<any[]>([]);

  const { user } = useAuth();
  const userId = user?.id;
  const router = useRouter();

  /**
   * Splits an array into chunks of a specified size.
   *
   * @param array - The array to be split into chunks.
   * @param size - The size of each chunk.
   * @returns A two-dimensional array where each sub-array is a chunk of the specified size.
   */
  const chunk = <T>(array: T[], size: number): T[][] =>
    array.length
      ? [array.slice(0, size), ...chunk(array.slice(size), size)]
      : [];

  const paginatedPosts = chunk(postData, itemsPerPage);
  const currentPosts = paginatedPosts[activePage - 1] || [];

  /**
   * Fetches the list of recommended posts from the server using the APIFinalRecommendedPosts
   * function and filters out any posts created by the current user.
   *
   * If the user is not authenticated, it fetches the recommended posts without filtering.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await APIFinalRecommendedPosts();
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
    fetchData();
  }, [router.isReady]);

  return {
    currentPosts,
    totalPages: paginatedPosts.length,
    activePage,
    setPage,
    loading,
  };
}
