import { AppShell, Box, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import websiteData from "@/utils/mock/commonData.json"; // Assuming this contains the project title and other nav data
import list from "@/utils/mock/sideBar.json"; // Removed as it's not used in this layout's sidebar logic

/**
 * A layout component for the admin dashboard.
 *
 * This component wraps the page content in an AppShell and provides a navigation
 * sidebar with links to the project-specific dashboard pages.
 *
 * The component expects a children prop, which should be the JSX to render
 * within the main content area of the page.
 *
 * The layout will automatically redirect to the login page if no token is present
 * in the cookies.
 *
 * The component also includes a logout button in the header that will delete the
 * token and user cookies and redirect to the login page.
 *
 * The component will automatically apply a height of 100vh to the main content
 * area if the content is shorter than the viewport height.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to render in the main area
 * @returns {React.ReactElement} The AppShell component
 */
export function AdminDashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const id = router.query.projectId;

  useEffect(() => {
    if (!router.isReady) return;
    const token = getCookie("token");
    if (!token) {
      router.push("/"); // Redirect to login if no token
    }
  }, [router.isReady, router.pathname, router.query, router]); // Added router to dependency array for completeness

  /**
   * Logs out the user by deleting the user and token cookies.
   *
   * This function deletes the "user" and "token" cookies and redirects
   * the user to the homepage. It is intended to be used as a logout
   * mechanism in the admin dashboard.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the cookies are deleted and redirection occurs.
   */
  const handleLogout = async () => {
    await deleteCookie("user");
    await deleteCookie("token");
    router.push("/");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250, // Dynamic width based on 'project' state
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      style={{ backgroundColor: "#f1f2f6" }}
    >
      <AppShell.Header style={{ backgroundColor: "#f1f2f6" }}>
        <div className="flex justify-between items-center pt-4 container mx-auto bg-light-bg">
          <h1 className="text-2xl text-darkText font-bold">
            {websiteData?.projectTitleSmall}
          </h1>
          <h1 className="text-2xl text-darkText font-bold">ADMIN DASHBOARD</h1>
          <div>
            <Button
              onClick={handleLogout}
              radius="md"
              size="sm"
              color="black"
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>
      </AppShell.Header>
      <AppShell.Navbar style={{ backgroundColor: "#f1f2f6" }}>
        {/* Removed redundant fixed Box, AppShell.Navbar handles positioning */}
        <Box
          className="flex flex-col gap-4 container mx-auto" // Apply flex and gap to the container Box
          style={{
            width: "100%", // Take full width of the navbar
            padding: "10px",
            borderRight: "1px solid #eaeaea",
            height: "calc(100vh - 60px)", // Fill remaining height below header
            overflowY: "auto", // Enable scrolling for long lists
            color: "#F1F2F6",
          }}
        >
          {/* Takes user to the project-specific dashboard */}
          {list?.map((list: any) => (
            <Button
              key={list?.id} // Move key to the Button as it's now the direct child
              onClick={() => router.push(`/dashboard/${list?.slug}`)}
              radius="md"
              size="sm"
              color="#F28F3B"
              fullWidth
              variant={
                router.pathname === `/dashboard/${list?.slug}`
                  ? "filled"
                  : "outline"
              }
            >
              {list.title}
            </Button>
          ))}
        </Box>
      </AppShell.Navbar>
      <AppShell.Main color="#F1F2F6">
        <Box style={{ padding: "20px", color: "#F1F2F6" }}>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
