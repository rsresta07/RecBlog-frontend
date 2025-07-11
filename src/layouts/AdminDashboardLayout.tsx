import { AppShell, Box, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import websiteData from "@/utils/mock/commonData.json"; // Assuming this contains the project title and other nav data
import list from "@/utils/mock/sideBar.json"; // Removed as it's not used in this layout's sidebar logic

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
