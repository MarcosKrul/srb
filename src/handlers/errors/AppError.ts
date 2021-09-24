import { errors } from "./errors.pt-br.json";

export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    this.message = message;
    this.statusCode = statusCode;
  }

  public static getErrorMessage(key: string, err?: any): string {
    if (err && err instanceof AppError) return err.message;
    const { label } = errors.filter((item) => item.key === key)[0];
    return label;
  }

  public static getErrorStatusCode(error: any): number {
    return error instanceof AppError ? error.statusCode : 500;
  }
}
