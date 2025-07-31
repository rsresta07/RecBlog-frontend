import { useState, useEffect } from "react";
import { AdminDashboardLayout } from "@/layouts/AdminDashboardLayout";
import {
  ApiGetAllTags,
  ApiAddTag,
  ApiToggleTagStatus,
  ApiEditTag,
} from "@/api/tag";
import { Button } from "@mantine/core";
import { Switch } from "@mantine/core";

/**
 * AdminTags component for managing tags in the admin dashboard.
 *
 * This component allows admins to view, add, and delete tags.
 * It fetches the list of tags from the server on mount and provides
 * options to add new tags or delete existing ones.
 *
 * State:
 * - `tags`: List of tags fetched from the server.
 * - `newTag`: Input value for the new tag to be added.
 * - `loading`: Indicates if the tags are currently being fetched.
 * - `error`: Error message to display if an operation fails.
 *
 * Functions:
 * - `fetchTags`: Fetches all tags from the server and updates the state.
 * - `handleAddTag`: Adds a new tag to the server and refreshes the list.
 * - `handleDeleteTag`: Deletes a tag from the server and refreshes the list.
 *
 * Returns:
 * JSX.Element to render the tag management UI.
 */
const AdminTags = () => {
  type Tag = {
    id: string;
    title: string;
    status: boolean;
  };

  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Fetches all tags from the server and updates the state.
   *
   * - Sets loading state to true while fetching.
   * - Sets tags state to the response data from the server or an empty array if the response is null.
   * - Sets an error message to display if an error occurs.
   * - Sets loading state to false after the fetch is complete.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
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

  /**
   * Handles adding a new tag to the server.
   *
   * - Trims the new tag input value.
   * - Adds the new tag to the server using the `ApiAddTag` function.
   * - Resets the new tag input value.
   * - Refreshes the list of tags by calling `fetchTags`.
   *
   * If an error occurs, it logs the error and sets the error state to be
   * displayed.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
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

  const handleToggleStatus = async (tagId: string) => {
    try {
      await ApiToggleTagStatus(tagId);
      fetchTags();
    } catch (err) {
      console.error("Failed to toggle tag status", err);
      setError("Could not toggle tag status.");
    }
  };

  const handleEditTag = async (tagId: string, currentTitle: string) => {
    const newTitle = prompt("Enter new tag title:", currentTitle);
    if (!newTitle || newTitle.trim() === "") return;

    try {
      await ApiEditTag(tagId, { title: newTitle.trim() });
      fetchTags();
    } catch (err) {
      console.error("Failed to edit tag", err);
      setError("Could not edit tag.");
    }
  };

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
              <div className="flex gap-4 items-center">
                <Switch
                  checked={tag.status}
                  onChange={() => handleToggleStatus(tag.id)}
                  color="green"
                  size="md"
                  className="scale-110"
                />
                <button
                  onClick={() => handleEditTag(tag?.id, tag?.title)}
                  className="bg-primary px-2 py-1 rounded-lg shadow-lg shadow-secondary hover:bg-accent hover:shadow-accent transition-colors duration-300"
                >
                  Edit
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

/**
 * A function that returns a layout that wraps the AdminTags component with the
 * AdminDashboardLayout component.
 *
 * @param {any} page - The page component to be wrapped.
 *
 * @returns {JSX.Element} A JSX element that wraps the AdminTags component.
 */
AdminTags.getLayout = (page: any) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
