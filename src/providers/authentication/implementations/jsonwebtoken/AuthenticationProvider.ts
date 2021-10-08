import { sign } from "jsonwebtoken";

import { AppError } from "@error/AppError";
import { env } from "@helpers/env";
import { JwtPayloadModel } from "@models/JwtPayloadModel";
import { IAuthenticationProvider } from "@providers/authentication";

class AuthenticationProvider implements IAuthenticationProvider {
  generateToken(payload: JwtPayloadModel): string {
    const secret = env("JWT_SECRET_KEY");
    if (!secret)
      throw new AppError(500, AppError.getErrorMessage("ErrorEnvJwtSecretKey"));

    const token = sign(payload, secret, {
      expiresIn: payload.type === "access_token" ? "3d" : "30d",
    });
    return token;
  }
}

export { AuthenticationProvider };
