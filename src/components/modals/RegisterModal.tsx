import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import CommonForm from "../common/CommonForm";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { setCookie } from "cookies-next";
import { ApiRegister } from "@/api/auth";
import showNotify from "@/utils/notify";
import { useAuth } from "@/utils/hooks/useAuth";
import LoginModal from "./LoginModal";
import PasswordInputWithStrength from "../common/PasswordInputWithStrength";

// Validation Schema
const schema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .regex(/^[^\d]*$/, "Full name should not contain numbers"),
    email: z
      .string()
      .email("Invalid email address")
      .refine((val) => !/^\d/.test(val), {
        message: "Email should not start with a number",
      }),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Za-z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    position: z.string().min(1, "Expertise is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Form Type
interface RegisterForm extends z.infer<typeof schema> {}

const RegisterModal = ({ openLoginModal }: { openLoginModal: () => void }) => {
  const [noTransitionOpened, setNoTransitionOpened] = useState(false);
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  // Input Fields
  const fields = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    autoComplete: "off",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "your@email.com",
  },
  {
    name: "position",
    label: "Expertise",
    placeholder: "e.g., Web Developer",
  },
  {
    name: "password",
    render: () => (
      <PasswordInputWithStrength
        name="password"
        label="Password"
        placeholder="Create a password"
      />
    ),
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Re-enter password",
    autoComplete: "new-password",
  },
];

  // Submit handler
  const handleSubmit: SubmitHandler<RegisterForm> = async (formData) => {
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        position: formData.position.trim(),
        role: "USER",
        status: "APPROVED",
      };

      const res = await ApiRegister(payload);

      if (res?.data?.id) {
        showNotify("success", "Registration successful. Please log in.");
        setNoTransitionOpened(false); // close register
        setShowLogin(true); // open login modal
      } else {
        showNotify("fail", "Something went wrong. Please try again.");
      }
    } catch (error: any) {
      const code = error?.response?.data?.statusCode ?? error?.response?.status;
      const message = error?.response?.data?.message || "Unexpected error";

      if (code === 409) {
        showNotify("fail", "Account already exists. Please log in.");
        openLoginModal();
      } else {
        showNotify("fail", message);
      }
    }
  };

  return (
    <>
      <Modal
        opened={noTransitionOpened}
        onClose={() => setNoTransitionOpened(false)}
        title="Sign Up Now"
        centered
        size="lg"
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
          buttonText="Register"
          showCheckbox={true}
          footerLinkText="Already have an account?"
          footerLinkLabel="Login"
          footerLinkAction={() => {
            setNoTransitionOpened(false);
            setShowLogin(true);
          }}
          twoColumnLayout={true}
        />
      </Modal>

      <Button
        variant="transparent"
        color="black"
        size="compact-xl"
        onClick={() => setNoTransitionOpened(true)}
      >
        <label className="font-normal text-primary hover:underline decoration-secondary decoration-4 underline-offset-4 transition-all duration-300">
          Sign Up
        </label>
      </Button>

      <LoginModal
        triggerOpen={showLogin}
        setTriggerOpen={setShowLogin}
        openRegisterModal={() => setNoTransitionOpened(true)}
      />
    </>
  );
};

export default RegisterModal;
