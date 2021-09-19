import { NextFunction, Request, Response } from "express";

import { AppError } from "@errors/AppError";
import { IResponseMessage } from "@infra/http";

const errorHandler = (
  err: Error,
  _: Request,
  res: Response<IResponseMessage>,
  __: NextFunction
): void | Response<IResponseMessage> => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: AppError.getErrorMessage("ErrorInternal"),
  });
};

export { errorHandler };
