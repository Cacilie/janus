import { JapiDBFactory } from "./JapiDBFactory";
import { JapiDBService } from "./JapiDBService";
import { type Time } from "../Types/Time";
import { type TimerStateType } from "../Types/TimerState";

export class TimesService {
  private times: Time[] = [];
  private nextId: number = 0;
  private japiDBService: JapiDBService;

  // Constructor is public now, but instance will be managed by Factory
  constructor() {
    this.japiDBService = JapiDBFactory.getJapiDBService();
    this.loadTimes()
  }

  loadTimes() : void{
    let savedTimes = this.japiDBService.getTimes()
    this.setTimes(savedTimes)

  }

  setTimes(timesList : Time[]) : void {
    this.times = [...timesList]
  }

  getTimes(): Time[] {
    return [...this.times];
  }

  getTotalSeconds(): number {
    return this.japiDBService.getTotalSeconds();
  }

  setTotalSeconds(seconds: number): void {
    this.japiDBService.pushTotalSeconds(seconds);
  }

  getChronoSeconds(): number {
    return this.japiDBService.getChronoSeconds();
  }

  setChronoSeconds(seconds: number): void {
    this.japiDBService.pushChronoSeconds(seconds);
  }

  getTimerState(): TimerStateType {
    return this.japiDBService.getTimerState();
  }

  setTimerState(state: TimerStateType): void {
    this.japiDBService.pushTimerState(state);
  }

  getLatestId(): number {
    if (this.times.length === 0) {
      return -1;
    }
    return Math.max(...this.times.map(t => t.id));
  }

  addTime(totalTime: number): Time {
    this.nextId = this.getLatestId() + 1;
    const newTime: Time = {
      id: this.nextId,
      totalTime,
      date: new Date().toISOString(),
    };
    this.times.push(newTime);
    this.japiDBService.pushTime(newTime);
    return newTime;
  }

  clearTimes(): void {
    this.times = [];
    this.nextId = 0;
  }
}
