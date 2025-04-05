import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import CommonForm from "../common/CommonForm";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email("Email not valid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Za-z]/, "Password should contain at least one letter")
    .regex(/[0-9]/, "Password should contain at least one number"),
});

const LoginModal = ({
  openRegisterModal,
}: {
  openRegisterModal: () => void;
}) => {
  const [noTransitionOpened, setNoTransitionOpened] = useState(false);

  const fields = [
    { name: "email", label: "Email", placeholder: "Enter your email" },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
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
            setNoTransitionOpened(false); // Close the login modal
            openRegisterModal(); // Open the register modal
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
