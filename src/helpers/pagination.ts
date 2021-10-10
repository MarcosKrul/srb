/* eslint-disable func-names */
import { AppError } from "@error/AppError";
import { IPaginationOptions } from "@infra/http";

import { env } from "./env";

const pagination = ({ size, page }: IPaginationOptions): [number, number] => {
  const take = (function (): number {
    if (size) {
      const converted = Number(size);
      if (Number.isNaN(converted))
        throw new AppError(
          400,
          AppError.getErrorMessage("ErrorQueryTypecasting")
        );

      return converted;
    }

    const sizeDefault = Number(env("PAGE_SIZE_DEFAULT"));
    if (!sizeDefault || Number.isNaN(sizeDefault))
      throw new AppError(
        500,
        AppError.getErrorMessage("ErrorEnvPageSizeDefault")
      );

    return sizeDefault;
  })();

  const skip = (function (): number {
    if (page) {
      const converted = Number(page);
      if (Number.isNaN(converted))
        throw new AppError(
          400,
          AppError.getErrorMessage("ErrorQueryTypecasting")
        );
      return converted * take;
    }

    return 0;
  })();

  return [take, skip];
};

export { pagination };
