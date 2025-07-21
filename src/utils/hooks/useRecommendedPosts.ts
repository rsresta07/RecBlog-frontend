import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/hooks/useAuth";
import { APIFinalRecommendedPosts } from "@/api/recommendation";

export function useRecommendedPosts(itemsPerPage: number = 6) {
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);
  const [postData, setPostData] = useState<any[]>([]);

  const { user } = useAuth();
  const userId = user?.id;
  const router = useRouter();

  const chunk = <T>(array: T[], size: number): T[][] =>
    array.length
      ? [array.slice(0, size), ...chunk(array.slice(size), size)]
      : [];

  const paginatedPosts = chunk(postData, itemsPerPage);
  const currentPosts = paginatedPosts[activePage - 1] || [];

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
