import { NextFunction, Request, Response } from "express";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { IResponseMessage } from "@infra/http";

const errorHandlerMiddleware = (
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
    message: i18n.__("ErrorInternal"),
  });
};

export { errorHandlerMiddleware };
