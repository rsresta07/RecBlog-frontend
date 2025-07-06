import { Box, Group, Kbd } from '@mantine/core';

export function Shortcut({ symbol, description }: { symbol: string; description: string }) {
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