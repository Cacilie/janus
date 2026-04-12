import { Button, Group, Paper } from "@mantine/core";
import { IconPlayerPlay, IconPlayerPause, IconPlayerStop } from "@tabler/icons-react";
import { type ActionsComponentProps } from "../Types/ActionsComponent";
import { TimerState } from "../Types/TimerState";

export function ActionsComponent({ timerState, onStart, onPause, onStop }: ActionsComponentProps) {
  return (
    <Paper p="xl" withBorder>
      <Group justify="center">
        {timerState === TimerState.STOP ? (
          <Button 
            size="lg" 
            color="red" 
            onClick={onStop}
            leftSection={<IconPlayerStop size={20} />}
          >
            STOP
          </Button>
        ) : timerState === TimerState.START ? (
          <Button 
            size="lg" 
            onClick={onStart} 
            style={{ backgroundColor: "#F0C571", color: "black" }}
            leftSection={<IconPlayerPlay size={20} />}
          >
            Start
          </Button>
        ) : (
          <Button 
            size="lg" 
            onClick={onPause} 
            style={{ backgroundColor: "#F0C571", color: "black" }}
            leftSection={<IconPlayerPause size={20} />}
          >
            Pause
          </Button>
        )}
      </Group>
    </Paper>
  );
}
