import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import { PasswordInput, Progress, Text, Popover, Box } from "@mantine/core";
import { useFormContext } from "react-hook-form";

/**
 * Component to show a password requirement.
 * @param {{meets: boolean; label: string}} props
 * @prop {boolean} meets Whether the password meets the requirement.
 * @prop {string} label The label to display for the requirement.
 * @returns {JSX.Element} A styled Text component with an icon and the requirement.
 */
function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

/**
 * Calculates the strength of a password.
 * @param {string} password The password to check.
 * @returns {number} A number between 10 and 100 representing the strength of the password.
 * The strength is calculated by counting the number of requirements that aren't met.
 * If the password is longer than 5 characters, this isn't counted as a requirement.
 * The strength is then calculated as 100 - (100 / (requirements.length + 1)) * multiplier.
 * The minimum strength is 10.
 */
function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;
  requirements.forEach((req) => {
    if (!req.re.test(password)) multiplier += 1;
  });
  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

/**
 * A PasswordInput component that displays a popover with password strength requirements.
 * @prop {string} name The name of the field.
 * @prop {string} label The label for the field.
 * @prop {string} placeholder The placeholder text for the field.
 * @returns {JSX.Element} A Popover component with a PasswordInput target and a dropdown with
 * a progress bar and password requirements.
 */
export default function PasswordInputWithStrength({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder: string;
}) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { register, watch } = useFormContext();
  const value = watch(name) ?? "";

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            withAsterisk
            label={label}
            placeholder={placeholder}
            {...register(name)}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label="Includes at least 6 characters"
          meets={value.length > 5}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
