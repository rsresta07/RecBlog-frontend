import { AppShell, Box, Anchor, Burger } from "@mantine/core";
import "@mantine/core/styles.css";
import CommonLogo from "../components/common/CommonLogo";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

export function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  // const [opened, { toggle }] = useDisclosure();
  // const router = useRouter();
  // useEffect(() => {
  //   if (getCookie("token") != null) {
  //     router.push("/dashboard");
  //   }
  // }, [router]);

  return (
    <AppShell
      styles={{
        main: { marginLeft: 280, marginRight: 200 },
        header: { marginLeft: 15, marginRight: 15 },
      }}
    >
      <AppShell.Header>
        <CommonLogo />
      </AppShell.Header>

      <AppShell.Main>
        <div> {children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
