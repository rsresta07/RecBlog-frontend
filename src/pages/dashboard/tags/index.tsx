import { useState, useEffect } from "react";
import { AdminDashboardLayout } from "@/layouts/AdminDashboardLayout";
import { ApiGetAllTags, ApiAddTag, ApiDeleteTag } from "@/api/tag";
const AdminTags = () => {
  type Tag = {
    id: string;
    title: string;
  };

  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await ApiGetAllTags();
      setTags(response?.data || []);
    } catch (err) {
      console.error("Failed to fetch tags", err);
      setError("Error fetching tags.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    try {
      await ApiAddTag({ title: newTag.trim() });
      setNewTag("");
      fetchTags();
    } catch (err) {
      console.error("Failed to add tag", err);
      setError("Could not add tag.");
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    try {
      await ApiDeleteTag(tagId); // Call DELETE API
      fetchTags(); // Refresh list
    } catch (err) {
      console.error("Failed to delete tag", err);
      setError("Could not delete tag.");
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Tags</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border px-2 py-1 w-full max-w-xs"
          placeholder="New tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button
          onClick={handleAddTag}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Add Tag
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : tags.length === 0 ? (
        <p>No tags available.</p>
      ) : (
        <ul className="space-y-2">
          {tags.map((tag) => (
            <li
              key={tag?.id}
              className="flex justify-between items-center border px-3 py-1 rounded"
            >
              <span>{tag.title}</span>
              <button
                onClick={() => handleDeleteTag(tag?.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminTags;

AdminTags.getLayout = (page: any) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
