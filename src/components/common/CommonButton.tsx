import { Button } from "@mantine/core";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  fullWidth?: boolean;
  variant?:
    | "filled"
    | "light"
    | "outline"
    | "subtle"
    | "default"
    | "white"
    | "transparent";
  radius?: string;
  size?: string;
  type?: "button" | "submit" | "reset";
  color?: string;
};

// ! DO NOT GIVE CLASSNAME FOR BUTTONS IN <CommonButton />

const CommonButton = ({
  label,
  onClick,
  radius = "md",
  variant = "filled",
  size = "md",
  type = "button",
  fullWidth = true,
  color = "grape",
  ...props
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      fullWidth={fullWidth}
      className="shadow-lg"
      color="primary-btn"
      variant={variant}
      radius={radius}
      size={size}
      type={type}
      // autoContrast
      {...props}
    >
      {label}
    </Button>
  );
};

export default CommonButton;
