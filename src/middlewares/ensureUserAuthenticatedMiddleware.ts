import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { IResponseMessage } from "@infra/http";
import { AuthenticationProvider } from "@providers/authentication";

const ensureUserAuthenticatedMiddleware = async (
  req: Request,
  res: Response<IResponseMessage>,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader)
      return res.status(400).json({
        success: false,
        message: i18n.__("ErrorGenericToken"),
      });

    const parts = tokenHeader.split(" ");
    const [scheme, token] = parts;

    if (parts.length !== 2 || !/^Bearer$/i.test(scheme))
      return res.status(400).json({
        success: false,
        message: "ErrorGenericToken",
      });

    const authenticationProvider = await container.resolve(
      AuthenticationProvider
    );

    const payload = authenticationProvider.decode(token);
    if (!payload)
      return res.status(400).json({
        success: false,
        message: "ErrorGenericToken",
      });

    if (payload.exp && Date.now() >= payload.exp * 1000)
      return res.status(401).json({
        success: false,
        message: i18n.__("ErrorGenericToken"),
      });

    if (payload.type === "refresh_token")
      return res.status(400).json({
        success: false,
        message: i18n.__("ErrorGenericToken"),
      });

    const valid = authenticationProvider.verify(token);
    if (!valid)
      return res.status(400).json({
        success: false,
        message: i18n.__("ErrorGenericToken"),
      });

    return next();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(500, i18n.__("ErrorGenericToken"));
  }
};

export { ensureUserAuthenticatedMiddleware };
