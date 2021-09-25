import { hash as bHash, compare as bCompare } from "bcrypt";

import { AppError } from "@error/AppError";
import { env } from "@helpers/env";

import { IHashProvider } from "../../models/IHashProvider";

class HashProvider implements IHashProvider {
  async hash(payload: string): Promise<string> {
    const salt = Number(env("PASSWD_HASH_SALT"));

    if (!salt)
      throw new AppError(
        500,
        AppError.getErrorMessage("ErrorEnvPasswdHashSalt")
      );

    return bHash(payload, salt);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return bCompare(payload, hashed);
  }
}

export { HashProvider };
