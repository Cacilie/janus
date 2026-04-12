import { type TimerStateType } from "./TimerState";

export interface ActionsComponentProps {
  timerState: TimerStateType;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}
