import { inject, injectable } from "tsyringe";

import { AppError } from "@error/AppError";
import { env } from "@helpers/env";
import { LoginRequestModel } from "@models/LoginRequestModel";
import { LoginResponseModel } from "@models/LoginResponseModel";
import { IHashProvider } from "@providers/hash";
import { ISessionRepository } from "@repositories/session";

import { Employee, Student } from ".prisma/client";

@injectable()
class LoginService {
  constructor(
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: LoginRequestModel): Promise<LoginResponseModel> {
    if (!email || !password)
      throw new AppError(
        400,
        AppError.getErrorMessage("ErrorLoginCredentials")
      );

    const hasUser = await this.sessionRepository.findOne(email);
    if (!hasUser)
      throw new AppError(
        400,
        AppError.getErrorMessage("ErrorLoginCredentials")
      );

    const maxAttempts = Number(env("MAX_LOGIN_ATTEMPTS"));
    if (!maxAttempts)
      throw new AppError(
        500,
        AppError.getErrorMessage("ErrorEnvMaxLoginAttempts")
      );

    if (hasUser.blocked || hasUser.attempts >= maxAttempts)
      throw new AppError(400, AppError.getErrorMessage("ErrorBlockedAccount"));

    const matchPassword = await this.hashProvider.compare(
      password,
      hasUser.password
    );

    if (!matchPassword) {
      const sessionUpdated = await this.sessionRepository.incrementAttempts({
        userId: hasUser.userId,
        attempts: hasUser.attempts + 1,
        blocked: hasUser.attempts + 1 === maxAttempts,
      });

      if (sessionUpdated.blocked) {
        console.log("Mandar email - conta bloqueda");
      }

      throw new AppError(
        400,
        AppError.getErrorMessage("ErrorLoginBlockedAccount")
      );
    }

    return {
      email: hasUser.primary,
      name: hasUser.user.name,
      avatar: hasUser.user.profile?.avatar,
      bio: hasUser.user.profile?.bio,
      token: "",
      refreshToken: "",
      entity: {
        type: hasUser.user.userGroup.group,
        data:
          (hasUser.user.employee as Employee) ||
          (hasUser.user.student as Student),
      },
    };
  }
}

export { LoginService };
