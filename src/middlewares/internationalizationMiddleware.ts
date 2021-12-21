import { NextFunction, Request, Response } from "express";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { Languages } from "@infra/utils";

const validate = (value: string): Languages | null => {
  const valid = Object.values(Languages).filter(
    (item: string) => item === value
  );

  const formatted =
    valid && valid.length === 1 ? (valid[0] as Languages) : null;

  return formatted;
};

const internationalizationMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { lang } = req.query;
    const { language } = req.headers;

    i18n.setLocale(
      validate(language as string) ||
        validate(lang as string) ||
        Languages.PORTUGUESE
    );
  } catch (e) {
    throw new AppError(500, "Ocorreu um erro interno.");
  }

  next();
};

export { internationalizationMiddleware };
