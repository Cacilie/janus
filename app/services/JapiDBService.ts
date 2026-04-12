import { Collection, Item } from "japidb";
import { type Time } from "../Types/Time";
import { TimerState, type TimerStateType } from "../Types/TimerState";

export class JapiDBService {

  private timesCollection: Collection;
  private totalSeconds: Item;
  private chronoSeconds: Item;
  private timerState: Item;


  constructor() {
    this.timesCollection = new Collection('Times', 'id');
    this.totalSeconds = new Item('TotalSeconds', 0);
    this.chronoSeconds = new Item('ChronoSeconds', 0);

    // Patch to fix bad data in localStorage (japidb string bug)
    if (typeof window !== "undefined") {
      const key = 'Item->TimerState';
      const localItem = localStorage.getItem(key);
      if (localItem && localItem.length > 0 && !localItem.startsWith('"')) {
          localStorage.removeItem(key);
      }
    }

    this.timerState = new Item('TimerState', JSON.stringify(TimerState.START));
  }

  pushTime(time : Time){
    this.timesCollection.save(time);
  }

  getTimes() : Time[]{
    return this.timesCollection.find();
  }

  pushTotalSeconds(seconds: number) {
    this.totalSeconds.save(seconds);
  }

  getTotalSeconds(): number {
    return this.totalSeconds.get();
  }

  pushChronoSeconds(seconds: number) {
    this.chronoSeconds.save(seconds);
  }

  getChronoSeconds(): number {
    return this.chronoSeconds.get();
  }

  pushTimerState(state: TimerStateType) {
    this.timerState.save(JSON.stringify(state));
  }

  getTimerState(): TimerStateType {
    return this.timerState.get();
  }

}

