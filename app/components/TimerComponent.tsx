import { Text, Paper, Stack } from "@mantine/core";

interface TimerComponentProps {
  minutes: number;
  seconds: number;
  chronoSeconds: number;
}

export function TimerComponent({ minutes, seconds, chronoSeconds }: TimerComponentProps) {
  const formatChrono = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Paper p="xl" withBorder style={{ backgroundColor: "navy" }}>
      <Stack align="center">
        <Text ta="center" c="white" style={{ fontSize: "7.5rem", lineHeight: 1, fontFamily: "Helvetica, Arial, sans-serif" }}>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </Text>
        <Text ta="center" c="white" style={{ fontSize: "2rem", fontFamily: "Helvetica, Arial, sans-serif" }}>
          {formatChrono(chronoSeconds)}
        </Text>
      </Stack>
    </Paper>
  );
}
