import { JapiDBService } from "./JapiDBService";

export class JapiDBFactory {
  private static instance: JapiDBService;

  public static getJapiDBService(): JapiDBService {
    if (!JapiDBFactory.instance) {
      JapiDBFactory.instance = new JapiDBService();
    }
    return JapiDBFactory.instance;
  }
}
