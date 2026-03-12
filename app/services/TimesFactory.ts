import { TimesService } from "./TimesService";

export class TimesFactory {
  private static instance: TimesService;

  public static getTimesService(): TimesService {
    if (!TimesFactory.instance) {
      TimesFactory.instance = new TimesService();
    }
    return TimesFactory.instance;
  }
}
