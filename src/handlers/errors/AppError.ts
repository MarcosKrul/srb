class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    this.message = message;
    this.statusCode = statusCode;
  }

  public static getErrorStatusCode(error: any): number {
    return error instanceof AppError ? error.statusCode : 500;
  }
}

export { AppError };
