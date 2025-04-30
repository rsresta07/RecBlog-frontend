import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import CommonForm from "../common/CommonForm";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ApiLogin } from "@/api/auth";
import { setCookie } from "cookies-next";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

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
}: {
  openRegisterModal: () => void;
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
          username: res?.data?.username,
          role: res?.data?.role,
        };
        setCookie("token", res?.data?.token);
        setCookie("user", JSON.stringify(user));
        await router.push("/dashboard");
      } else {
        console.log("Wrong credentials");
      }
    } catch (error) {
      console.log(error);
    }
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

      <Button
        variant="transparent"
        color="black"
        size="compact-xl"
        onClick={() => setNoTransitionOpened(true)}
      >
        <label className="font-normal">Sign In</label>
      </Button>
    </>
  );
};

export default LoginModal;
