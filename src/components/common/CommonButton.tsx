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

/**
 * A Mantine Button component with default styles and properties.
 *
 * The styles applied are:
 * - `shadow-lg` to give a drop shadow to the button
 * - `hover:bg-secondary` to change the background color to `secondary-color` on hover
 * - `transition-colors duration-300` to animate the color change
 *
 * The default properties are:
 * - `radius="md"` for a medium border radius
 * - `variant="filled"` for a filled button
 * - `size="md"` for a medium button size
 * - `type="button"` for a normal button type
 * - `fullWidth=true` to make the button take up the full width
 * - `color="primary-color"` to use the primary color for the button
 *
 * Any additional properties can be passed in and will be applied to the button.
 *
 * @param label The label for the button
 * @param onClick The function to call when the button is clicked
 * @param radius The border radius of the button
 * @param variant The variant of the button
 * @param size The size of the button
 * @param type The type of the button
 * @param fullWidth Whether the button should take up the full width
 * @param color The color of the button
 * @param props Any additional properties to pass in
 */
const CommonButton = ({
  label,
  onClick,
  radius = "md",
  variant = "filled",
  size = "md",
  type = "button",
  fullWidth = true,
  color = "primary-color",
  ...props
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      fullWidth={fullWidth}
      className="shadow-lg hover:bg-secondary transition-colors duration-300"
      color={color}
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
