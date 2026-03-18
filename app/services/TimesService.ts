export interface Time {
  id: number;
  totalTime: number;
  date: string;
}

export class TimesService {
  private times: Time[] = [];
  private nextId: number = 0;

  // Constructor is public now, but instance will be managed by Factory
  constructor() {}

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
