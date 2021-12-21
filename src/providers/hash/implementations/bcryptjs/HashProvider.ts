import { hash as bHash, compare as bCompare } from "bcryptjs";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { env } from "@helpers/env";

import { IHashProvider } from "../../models/IHashProvider";

class HashProvider implements IHashProvider {
  async hash(payload: string): Promise<string> {
    const salt = Number(env("PASSWD_HASH_SALT"));

    if (!salt) throw new AppError(500, i18n.__("ErrorEnvPasswdHashSalt"));

    return bHash(payload, salt);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return bCompare(payload, hashed);
  }
}

export { HashProvider };
