import { Text, Paper, Stack } from "@mantine/core";

interface TimerComponentProps {
  minutes: number;
  seconds: number;
}

export function TimerComponent({ minutes, seconds }: TimerComponentProps) {
  return (
    <Paper p="xl" withBorder style={{ backgroundColor: "navy" }}>
      <Stack align="center">
        <Text fw="300" ta="center" c="white" style={{ fontSize: "7.5rem", lineHeight: 1, fontFamily: "Helvetica, Arial, sans-serif" }}>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </Text>
        <Text  ta="center" c="white" style={{ fontSize: "2rem", fontFamily: "Helvetica, Arial, sans-serif" }}>
          00:00:00
        </Text>
      </Stack>
    </Paper>
  );
}
