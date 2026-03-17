import { AppShell, Group, Text } from "@mantine/core";

export function HeaderComponent() {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Text size="xl" fw={700}>
          Janus
        </Text>
      </Group>
    </AppShell.Header>
  );
}
