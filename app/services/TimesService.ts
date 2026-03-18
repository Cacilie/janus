import { JapiDBFactory } from "./JapiDBFactory";
import { JapiDBService } from "./JapiDBService";

export interface Time {
  id: number;
  totalTime: number;
  date: string;
}

export class TimesService {
  private times: Time[] = [];
  private nextId: number = 0;
  private japiDBService: JapiDBService;

  // Constructor is public now, but instance will be managed by Factory
  constructor() {
    this.japiDBService = JapiDBFactory.getJapiDBService();
  }

  getTimes(): Time[] {
    return [...this.times];
  }

  addTime(totalTime: number): Time {
    const newTime: Time = {
      id: this.nextId++,
      totalTime,
      date: new Date().toISOString(),
    };
    this.times.push(newTime);
    return newTime;
  }

  clearTimes(): void {
    this.times = [];
    this.nextId = 0;
  }
}
