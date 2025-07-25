import { Box, Group, Kbd } from "@mantine/core";

/**
 * Renders a keyboard shortcut display with a symbol and description.
 *
 * @param {Object} props - The properties for the Shortcut component.
 * @param {string} props.symbol - The symbol representing the specific key or keys.
 * @param {string} props.description - A brief description of the shortcut's function.
 * @returns A visual representation of a keyboard shortcut.
 */
export function Shortcut({
  symbol,
  description,
}: {
  symbol: string;
  description: string;
}) {
  return (
    <Group gap={7} p={10}>
      <Kbd size={20}>Ctrl</Kbd>
      <Box fz={22} fw={500}>
        +
      </Box>
      <Kbd size={20} w={40}>
        {symbol}
      </Kbd>

      <Box fz={18} ms="sm">
        – {description}
      </Box>
    </Group>
  );
}
