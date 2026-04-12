import { useState, useRef, useEffect } from "react";
import { Grid, Paper, Text } from "@mantine/core";
import type { Route } from "./+types/home";
import { TimerComponent } from "../components/TimerComponent";
import { ActionsComponent } from "../components/ActionsComponent";
import { TimeListComponent } from "../components/TimeListComponent";
import { TimesFactory } from "../services/TimesFactory";
import { TimerState, type TimerStateType } from "../Types/TimerState";

const MAX_TIME = 0.5;

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Janus!" },
  ];
}

export default function Home() {

  const getTimeService = () => {
    return TimesFactory.getTimesService();
  }


  const setTotalSecondsHelper = () => {

    let persistedChronoSecond = getTimeService().getChronoSeconds();
    let persistedTotalSeconds = getTimeService().getTotalSeconds();

    if(persistedChronoSecond == 0 && persistedTotalSeconds == 0) return MAX_TIME * 60;
    else return persistedTotalSeconds;

  }

  const setChronoSecondsHelper = () => {
    let persistedChronoSecond = getTimeService().getChronoSeconds();
    return persistedChronoSecond;
  }

  const setTimerStateHelper = () => {
    let persistedTimerState = getTimeService().getTimerState();
    return persistedTimerState || TimerState.START;
  }

  

  const [totalSeconds, setTotalSeconds] = useState(setTotalSecondsHelper());
  const [chronoSeconds, setChronoSeconds] = useState(setChronoSecondsHelper());
  const [timerState, setTimerState] = useState<TimerStateType>(setTimerStateHelper());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);





  const startChrono = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setChronoSeconds((prev) => {
        let second = prev + 1;
        getTimeService().setChronoSeconds(second);
        return second;
      });
    }, 1000);
  };

  const startTime = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimerState(TimerState.PAUSE);
    getTimeService().setTimerState(TimerState.PAUSE);
    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setTimerState(TimerState.STOP);
          getTimeService().setTimerState(TimerState.STOP);
          startChrono();
          getTimeService().setTotalSeconds(0);
          return 0;
        }

        let seconds = prev - 1;
        getTimeService().setTotalSeconds(seconds);
        return seconds;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState(TimerState.START);
    getTimeService().setTimerState(TimerState.START);
  };

  const stopAll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    getTimeService().addTime(MAX_TIME * 60 + chronoSeconds);
    
    setTimerState(TimerState.START);
    getTimeService().setTimerState(TimerState.START);
    setTotalSeconds(MAX_TIME * 60);
    getTimeService().setTotalSeconds(MAX_TIME * 60);
    setChronoSeconds(0);
    getTimeService().setChronoSeconds(0);
  };

  useEffect(() => {
    const persistedState = getTimeService().getTimerState();
    if (persistedState === TimerState.PAUSE) {
      startTime();
    } else if (persistedState === TimerState.STOP) {
      startChrono();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="home-container">
      <Grid p="xl">
        <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 3, md: 1 }}>
          <Paper p="xl" withBorder style={{ visibility: "hidden" }}>
            <Text>Row 1, Col 1</Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }}>
          <TimerComponent minutes={minutes} seconds={seconds} chronoSeconds={chronoSeconds} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 4, md: 3 }}>
          <TimeListComponent />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 5, md: 4 }}>
          <Paper p="xl" withBorder style={{ visibility: "hidden" }}>
            <Text>Row 2, Col 1</Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 2, md: 5 }}>
          <ActionsComponent 
            timerState={timerState} 
            onStart={startTime} 
            onPause={pauseTimer} 
            onStop={stopAll}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 6, md: 6 }}>
          <Paper p="xl" withBorder style={{ visibility: "hidden" }}>
            <Text>Row 2, Col 3</Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
  
