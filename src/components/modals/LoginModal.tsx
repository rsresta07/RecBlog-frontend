import { Button, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import CommonForm from "../common/CommonForm";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ApiLogin } from "@/api/auth";
import { setCookie } from "cookies-next";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import showNotify from "@/utils/notify";

const schema = z.object({
  email: z.string().email("Email not valid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Za-z]/, "Password should contain at least one letter")
    .regex(/[0-9]/, "Password should contain at least one number"),
});

interface LoginForm {
  email: string;
  password: string;
}

const LoginModal = ({
  openRegisterModal,
  triggerOpen,
  setTriggerOpen,
}: {
  openRegisterModal: () => void;
  triggerOpen?: boolean;
  setTriggerOpen?: (val: boolean) => void;
}) => {
  const [noTransitionOpened, setNoTransitionOpened] = useState(false);
  const router = useRouter();

  const fields = [
    { name: "email", label: "Email", placeholder: "Enter your email" },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
    },
  ];

  const handleSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res = await ApiLogin(data);

      if (res?.data?.id) {
        const user = {
          id: res?.data?.id,
          email: res?.data?.email,
          slug: res?.data?.slug,
          role: res?.data?.role,
        };

        setCookie("token", res?.data?.token);
        setCookie("user", JSON.stringify(user));

        // Redirect based on role
        if (user?.role === "SUPER_ADMIN") {
          window.location.href = "/dashboard";
        } else if (user?.role === "USER") {
          window.location.href = `/user/${user?.slug}`;
        } else {
          console.log("Unknown role");
        }
      } else {
        showNotify("error", "Wrong credentials");
      }
    } catch (error) {
      showNotify("error", "Wrong credentials");
    }
  };

  useEffect(() => {
    const handleRouteStart = () => setNoTransitionOpened(false);
    router.events.on("routeChangeStart", handleRouteStart);
    return () => router.events.off("routeChangeStart", handleRouteStart);
  }, [router.events]);

  useEffect(() => {
    if (triggerOpen !== undefined) {
      setNoTransitionOpened(triggerOpen);
    }
  }, [triggerOpen]);

  const closeModal = () => {
    setNoTransitionOpened(false);
    if (setTriggerOpen) setTriggerOpen(false);
  };

  return (
    <>
      <Modal
        opened={noTransitionOpened}
        onClose={() => setNoTransitionOpened(false)}
        title="Sign In"
        centered
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
      >
        <CommonForm
          fields={fields}
          onSubmit={handleSubmit}
          validationSchema={zodResolver(schema)}
          buttonText="Sign In"
          showCheckbox={false}
          footerLinkText="Don't have an account?"
          footerLinkLabel="Sign Up"
          footerLinkAction={() => {
            setNoTransitionOpened(false);
            openRegisterModal();
          }}
          twoColumnLayout={false}
        />
      </Modal>

      {/* <Button
        variant="transparent"
        color="black"
        size="compact-xl"
        onClick={() => setNoTransitionOpened(true)}
      >
        <label className="font-normal">Sign In</label>
      </Button> */}
    </>
  );
};

export default LoginModal;
