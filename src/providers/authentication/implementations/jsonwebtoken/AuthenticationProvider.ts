import { sign, verify as jwtVerify, decode as jwtDecode } from "jsonwebtoken";

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

  decode(token: string): JwtPayloadModel {
    try {
      const decoded = jwtDecode(token) as JwtPayloadModel;
      return decoded;
    } catch (error) {
      throw new AppError(400, AppError.getErrorMessage("ErrorGenericToken"));
    }
  }

  verify(token: string): boolean {
    const secret = env("JWT_SECRET_KEY");
    if (!secret)
      throw new AppError(500, AppError.getErrorMessage("ErrorEnvJwtSecretKey"));

    try {
      const valid = jwtVerify(token, secret);
      return !!valid;
    } catch (error) {
      throw new AppError(400, AppError.getErrorMessage("ErrorGenericToken"));
    }
  }
}

export { AuthenticationProvider };
