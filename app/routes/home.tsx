import { useState, useRef, useEffect } from "react";
import { Grid, Paper, Text } from "@mantine/core";
import type { Route } from "./+types/home";
import { TimerComponent } from "../components/TimerComponent";
import { ActionsComponent } from "../components/ActionsComponent";
import { TimeListComponent } from "../components/TimeListComponent";
import { TimesFactory } from "../services/TimesFactory";

const MAX_TIME = 1;

export type TimerState = "START" | "PAUSE" | "STOP";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Janus!" },
  ];
}

export default function Home() {
  const [totalSeconds, setTotalSeconds] = useState(MAX_TIME * 60);
  const [chronoSeconds, setChronoSeconds] = useState(0);
  const [timerState, setTimerState] = useState<TimerState>("START");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startChrono = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setChronoSeconds((prev) => prev + 1);
    }, 1000);
  };

  const startTime = () => {
    if (intervalRef.current) return;
    setTimerState("PAUSE");
    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setTimerState("STOP");
          startChrono();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState("START");
  };

  const stopAll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    const timesService = TimesFactory.getTimesService();
    timesService.addTime(MAX_TIME * 60 + chronoSeconds);
    
    setTimerState("START");
    setTotalSeconds(MAX_TIME * 60);
    setChronoSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="home-container">
      <Grid p="md">
        <Grid.Col span={4}>
          <Paper p="xl" withBorder>
            <Text>Row 1, Col 1</Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <TimerComponent minutes={minutes} seconds={seconds} chronoSeconds={chronoSeconds} />
        </Grid.Col>
        <Grid.Col span={4}>
          <TimeListComponent />
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper p="xl" withBorder>
            <Text>Row 2, Col 1</Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <ActionsComponent 
            timerState={timerState} 
            onStart={startTime} 
            onPause={pauseTimer} 
            onStop={stopAll}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper p="xl" withBorder>
            <Text>Row 2, Col 3</Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
