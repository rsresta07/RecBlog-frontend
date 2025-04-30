import { AppShell, Box } from "@mantine/core";
import CommonButton from "@/components/common/CommonButton";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import navBarData from "@/utils/mock/NavBar.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { ApiGetProjects } from "@/api/project";

export function AdminDashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const id = router.query.projectId;
  const [project, setProject] = useState(false);
  const [projectList, setProjectList] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await ApiGetProjects();
      setProjectList(response?.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/");
    }
    if (router?.pathname?.split("/").length > 2) {
      setProject(true);
    } else {
      setProject(false);
    }
    fetchProjects();
  }, [router.query]);

  const handleLogout = async () => {
    await deleteCookie("user");
    await deleteCookie("token");
    router.push("/login");
  };

  const List = [
    { id: "1", title: "About Us", slug: "about-us" },
    { id: "2", title: "Services", slug: "services" },
    { id: "3", title: "Product", slug: "products" },
    { id: "4", title: "Our Team", slug: "our-team" },
    { id: "5", title: "Slider Image", slug: "slider-image" },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: project ? 350 : 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <div className="flex justify-between container mx-auto items-center">
          <Image
            src={navBarData?.companyLogo}
            alt={navBarData?.companyLogoTitle}
            width={1024}
            height={1024}
            onClick={() => router.push("/dashboard")}
            className="h-[3.5rem] w-[auto] object-contain"
          />
          <h1 className="text-2xl text-darkText font-bold">ADMIN DASHBOARD</h1>
          <div>
            <CommonButton
              label="Logout"
              onClick={handleLogout}
              radius="md"
              size="sm"
              variant="outline"
            />
          </div>
        </div>
      </AppShell.Header>
      <AppShell.Navbar>
        <Box style={{ display: "flex", position: "fixed", top: 60 }}>
          <Box
            style={{
              width: 200,
              padding: "10px",
              borderRight: "1px solid #eaeaea",
            }}
          >
            {/*Takes user to the */}
            {projectList?.map((project: any) => (
              <div className={`mb-2`} key={project?.id}>
                <CommonButton
                  label={project.name}
                  onClick={() =>
                    router.push(`/dashboard/${project?.id}/about-us`)
                  }
                  radius="md"
                  size="sm"
                  variant={
                    router.query.projectId === project.id ? "filled" : "outline"
                  }
                />
              </div>
            ))}
          </Box>

          <Box
            style={{
              width: 150,
              padding: "10px",
              borderRight: "1px solid #eaeaea",
            }}
            className={`${project ? "block" : "hidden"}`}
          >
            {List?.map((listOption) => (
              <div className={`mb-2`} key={listOption?.id}>
                <CommonButton
                  label={listOption?.title}
                  onClick={() =>
                    router.push(`/dashboard/${id}/${listOption?.slug}`)
                  }
                  radius="md"
                  size="sm"
                  variant={
                    router.query.projectId === id &&
                    router.pathname.includes(listOption.slug)
                      ? "filled"
                      : "outline"
                  }
                />
              </div>
            ))}
          </Box>
        </Box>
      </AppShell.Navbar>
      <AppShell.Main>
        <Box style={{ padding: "20px" }}>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
