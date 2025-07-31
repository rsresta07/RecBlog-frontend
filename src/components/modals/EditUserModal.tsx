import { useEffect, useState } from "react";
import { Modal, Loader, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { ApiGetUser, ApiUpdateUserByAdmin } from "@/api/user";
import showNotify from "@/utils/notify";
import { EditUserInput, EditUserSchema } from "@/utils/schemas/EditUserSchema";
import EditUserForm from "@/components/modals/EditUserForm";

type EditUserModalProps = {
  opened: boolean;
  onClose: () => void;
  username: string | null;
  refresh: () => void;
};

const EditUserModal = ({
  opened,
  onClose,
  username,
  refresh,
}: EditUserModalProps) => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [userData, setUserData] = useState<EditUserInput | null>(null);

  const form = useForm({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {},
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (!opened || !username) return;

    const fetchUser = async () => {
      setLoading(true);
      setFetchError("");
      try {
        const res = await ApiGetUser(username);
        setUserData(res.data); // 👈 store for EditUserForm
        reset(res.data); // optional if you still want to use `form`
      } catch (err) {
        setFetchError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [opened, username, reset]);

  const onSubmit: SubmitHandler<EditUserInput> = async (data) => {
    if (!username) return;
    try {
      await ApiUpdateUserByAdmin(username, data);
      showNotify("success", "User updated");
      onClose();
      refresh();
    } catch (err) {
      showNotify("error", "Failed to update user");
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit User" centered>
      {loading ? (
        <Loader size="xl" style={{ margin: "auto", display: "block" }} />
      ) : fetchError ? (
        <Text color="red" ta="center">
          {fetchError}
        </Text>
      ) : userData ? ( // 👈 fix this
        <EditUserForm initialValues={userData} onSubmit={onSubmit} />
      ) : null}
    </Modal>
  );
};

export default EditUserModal;
