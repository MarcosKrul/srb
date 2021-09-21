import { success } from "./success.pt-br.json";

export class AppSuccess {
  public static getSuccessMessage(key: string): string {
    const { label } = success.filter((item) => item.key === key)[0];
    return label;
  }
}
