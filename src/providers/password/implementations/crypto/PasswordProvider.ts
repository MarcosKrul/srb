import { randomBytes } from "crypto";

import { AppError } from "@error/AppError";
import { env } from "@helpers/env";
import { IPasswordProvider } from "@providers/password";

class PasswordProvider implements IPasswordProvider {
  generate(): string {
    const length = Number(env("PASSWD_LENGTH"));
    if (!length || length < 0) throw new AppError(500, "ErrorGeneratePassword");

    return randomBytes(length).toString("hex").toUpperCase();
  }
}

export { PasswordProvider };
