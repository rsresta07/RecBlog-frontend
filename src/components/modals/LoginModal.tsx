import { Modal } from "@mantine/core";
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

/**
 * LoginModal component renders a modal for user login.
 *
 * Props:
 * - openRegisterModal: Function to open the registration modal.
 * - triggerOpen: Optional boolean to control the initial open state of the modal.
 * - setTriggerOpen: Optional function to update the open state externally.
 *
 * Features:
 * - Provides email and password input fields.
 * - Validates user input using zod schema.
 * - Submits the login form and handles authentication.
 * - Redirects users based on their roles after successful login.
 * - Displays error notifications on authentication failure.
 * - Integrates with router events to manage modal transitions.
 */
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

  /**
   * Handles the login form submission.
   * @param data - The form data containing the user's email and password.
   * @returns A promise that resolves if the login is successful and rejects otherwise.
   *
   * On success, this function:
   * - Sets the token and user cookies.
   * - Redirects the user to their respective dashboard based on their role.
   * On failure, this function displays an error notification with the message "Wrong credentials".
   */
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
          window.location.href = `/`;
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

  /**
   * Closes the login modal.
   * If the component is controlled (i.e. setTriggerOpen is a function), it also sets the triggerOpen state to false.
   */
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
    </>
  );
};

export default LoginModal;
