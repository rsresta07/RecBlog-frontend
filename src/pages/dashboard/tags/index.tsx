import { useState, useEffect } from "react";
import { AdminDashboardLayout } from "@/layouts/AdminDashboardLayout";
import { ApiGetAllTags, ApiAddTag, ApiDeleteTag } from "@/api/tag";
import { Button } from "@mantine/core";
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

  // const handleEditTag = async (tagId: string, newTitle: string) => {
  //   try {
  //     await ApiUpdateTag(tagId, newTitle); // Call PUT API
  //     fetchTags(); // Refresh list
  //   } catch (err) {
  //     console.error("Failed to update tag", err);
  //     setError("Could not update tag.");
  //   }
  // };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Manage Tags</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border px-2 py-1 w-full max-w-xs rounded-lg bg-light-bg text-secondary"
          placeholder="New tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />

        <Button
          variant="filled"
          color="primary-color"
          radius="md"
          onClick={handleAddTag}
          className="px-4 py-2 bg-primary text-light-text rounded-lg shadow-lg shadow-secondary hover:bg-secondary transition-colors duration-300"
        >
          Add Tag
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : tags.length === 0 ? (
        <p>No tags available.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4">
          {tags.map((tag) => (
            <li
              key={tag?.id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <span className="text-secondary">{tag.title}</span>
              <div className="flex gap-4">
                {/* <button
                  onClick={() => handleEditTag(tag?.id, tag?.title)}
                  className="bg-primary px-2 py-1 rounded-lg shadow-lg shadow-secondary hover:bg-accent hover:shadow-accent transition-colors duration-300"
                >
                  Edit Tag
                </button> */}
                <button
                  onClick={() => handleDeleteTag(tag?.id)}
                  className="bg-accent px-2 py-1 rounded-lg shadow-lg shadow-accent hover:bg-accent transition-colors duration-300"
                >
                  Delete Tag
                </button>
              </div>
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
