import { Button } from "@mantine/core";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  variant?: string;
  radius?: string;
  size?: string;
  type?: "button" | "submit" | "reset";
};

// ! DO NOT GIVE CLASSNAME FOR BUTTONS IN <CommonButton />

const CommonButton = ({
  label,
  onClick,
  radius,
  variant,
  size,
  type,
  ...props
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      fullWidth
      color="#7e22ce"
      {...props}
      className="shadow-lg"
      variant={variant}
      radius={radius}
      size={size}
      type={type}
    >
      {label}
    </Button>
  );
};

export default CommonButton;
