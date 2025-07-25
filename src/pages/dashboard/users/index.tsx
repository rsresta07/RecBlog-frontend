import { useEffect, useState } from "react";
import { Table, Loader, Text } from "@mantine/core";
import { AdminDashboardLayout } from "@/layouts/AdminDashboardLayout";
import { ApiGetAllUsers } from "@/api/user";

type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  position: string;
  role: string;
  status: string;
  last_login_at: string;
};

/**
 * AdminUsers component.
 *
 * This component is responsible for fetching and displaying a list of users in a table format
 * within the admin dashboard. It utilizes the `ApiGetAllUsers` function to retrieve user data
 * from the server. The component handles loading and error states, providing feedback to the user.
 * If no users are found, it displays a message indicating so. Each user is displayed in a table
 * row, showing details such as full name, email, username, position, role, status, and last login.
 *
 * @returns {JSX.Element} The AdminUsers component.
 */
const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Fetches the list of users from the server using the `ApiGetAllUsers` function.
   * Sets the `loading` state to true while the request is in progress and
   * `error` state if an error occurs. If the request is successful, it sets the
   * `users` state with the received list of users. Finally, it sets the `loading`
   * state to false.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await ApiGetAllUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching users", err);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return <Loader size="xl" style={{ margin: "auto", display: "block" }} />;
  if (error)
    return (
      <Text color="red" ta="center" mt="md">
        {error}
      </Text>
    );
  if (users.length === 0)
    return (
      <Text ta="center" mt="md">
        No users found.
      </Text>
    );

  const rows = users.map((user) => (
    <Table.Tr key={user.id} className="text-secondary">
      <Table.Td>{user.fullName}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>{user.position}</Table.Td>
      <Table.Td>{user.role}</Table.Td>
      <Table.Td>{user.status}</Table.Td>
      <Table.Td>{new Date(user.last_login_at).toLocaleString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">All Users</h1>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr className="text-primary">
            <Table.Th>Full Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Expertise</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Last Login</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default AdminUsers;

/**
 * getLayout is a method that returns a JSX.Element which will be used
 * as the layout for the AdminUsers component. It is used by Next.js to
 * wrap the component with the specified layout.
 * @param {any} page The page component to be rendered inside the layout.
 * @returns {JSX.Element} The layout component.
 */
AdminUsers.getLayout = (page: any) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
