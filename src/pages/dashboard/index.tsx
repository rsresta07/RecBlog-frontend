import { useEffect, useState } from "react";
import { AdminDashboardLayout } from "@/layouts/AdminDashboardLayout";
import { ApiGetAllUsers } from "@/api/user";
import { ApiGetAllTags } from "@/api/tag";
import { ApiGetPost } from "@/api/blog";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [tagCount, setTagCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  const fetchStats = async () => {
    try {
      const [usersRes, tagsRes, postsRes] = await Promise.all([
        ApiGetAllUsers(),
        ApiGetAllTags(),
        ApiGetPost(),
      ]);

      setUserCount(usersRes?.data?.length || 0);
      setTagCount(tagsRes?.data?.length || 0);
      setPostCount(postsRes?.data?.length || 0);
    } catch (err) {
      console.error("Error fetching dashboard stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary">
        Welcome to Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg shadow bg-white">
          <h2 className="text-xl font-semibold text-secondary">Total Users</h2>
          <p className="text-2xl font-bold text-accent">{userCount}</p>
        </div>
        <div className="p-4 border rounded-lg shadow bg-white">
          <h2 className="text-xl font-semibold text-secondary">Total Tags</h2>
          <p className="text-2xl font-bold text-accent">{tagCount}</p>
        </div>
        <div className="p-4 border rounded-lg shadow bg-white">
          <h2 className="text-xl font-semibold text-secondary">Total Posts</h2>
          <p className="text-2xl font-bold text-accent">{postCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

AdminDashboard.getLayout = (page: any) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
