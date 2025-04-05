import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import CommonForm from "../common/CommonForm";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    fname: z.string().min(1, "First name is required"),
    lname: z.string().min(1, "Last name is required"),
    email: z.string().email("Email not valid"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Za-z]/, "Password should contain at least one letter")
      .regex(/[0-9]/, "Password should contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterModal = ({ openLoginModal }: { openLoginModal: () => void }) => {
  const [noTransitionOpened, setNoTransitionOpened] = useState(false);

  const fields = [
    { name: "fname", label: "First name", placeholder: "Your first name" },
    { name: "lname", label: "Last name", placeholder: "Your last name" },
    { name: "email", label: "Email", placeholder: "Your email" },
    {
      name: "password",
      label: "Password",
      placeholder: "Password",
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm password",
      type: "password",
    },
  ];

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Modal
        opened={noTransitionOpened}
        onClose={() => setNoTransitionOpened(false)}
        title="Sign Up Now"
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
          buttonText="Register"
          showCheckbox={true}
          footerLinkText="Have an account?"
          footerLinkLabel="Login"
          footerLinkAction={() => {
            setNoTransitionOpened(false); // Close the register modal
            openLoginModal(); // Open the login modal
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
        <label className="font-normal">Sign Up</label>
      </Button>
    </>
  );
};

export default RegisterModal;
