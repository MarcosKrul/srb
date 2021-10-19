import { randomBytes } from "crypto";

import { AppError } from "@error/AppError";
import { env } from "@helpers/env";
import { IRandomTokenProvider } from "@providers/randomToken";

class RandomTokenProvider implements IRandomTokenProvider {
  generateForgotPasswd(): string {
    return randomBytes(25).toString("hex");
  }

  generatePassword(): string {
    const length = Number(env("PASSWD_LENGTH"));
    if (!length || length < 0) throw new AppError(500, "ErrorGeneratePassword");

    return randomBytes(length).toString("hex").toUpperCase();
  }
}

export { RandomTokenProvider };
