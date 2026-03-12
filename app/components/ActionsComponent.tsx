import { Button, Group, Paper } from "@mantine/core";
import type { TimerState } from "../routes/home";

interface ActionsComponentProps {
  timerState: TimerState;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export function ActionsComponent({ timerState, onStart, onPause, onStop }: ActionsComponentProps) {
  return (
    <Paper p="xl" withBorder>
      <Group justify="center">
        {timerState === "STOP" ? (
          <Button size="lg" color="red" onClick={onStop}>
            STOP
          </Button>
        ) : timerState === "START" ? (
          <Button size="lg" onClick={onStart} style={{ backgroundColor: "#F0C571", color: "black" }}>
            Start
          </Button>
        ) : (
          <Button size="lg" onClick={onPause} style={{ backgroundColor: "#F0C571", color: "black" }}>
            Pause
          </Button>
        )}
      </Group>
    </Paper>
  );
}
