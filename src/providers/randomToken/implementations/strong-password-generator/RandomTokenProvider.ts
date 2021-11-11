import {
  lower,
  upper,
  digits,
  symbols,
  randomString,
  randomPassword,
} from "secure-random-password";

import { AppError } from "@error/AppError";
import { env } from "@helpers/env";
import { IRandomTokenProvider } from "@providers/randomToken";

class RandomTokenProvider implements IRandomTokenProvider {
  generateForgotPasswd(): string {
    const token = randomString({ length: 8, characters: [upper, digits] });

    if (!token) throw new AppError(500, "ErrorGenerateForgottenPasswdToken");

    return token;
  }

  generatePassword(): string {
    const length = Number(env("PASSWD_LENGTH"));
    if (!length || length < 0) throw new AppError(500, "ErrorGeneratePassword");

    const generated = randomPassword({
      length,
      characters: [lower, upper, digits, symbols],
    });

    if (!generated) throw new AppError(500, "ErrorGeneratePassword");

    return generated;
  }
}

export { RandomTokenProvider };
