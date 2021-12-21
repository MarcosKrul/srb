import { inject, injectable } from "tsyringe";

import { AppError } from "@error/AppError";
import { env } from "@helpers/env";
import { LoginRequestModel } from "@models/LoginRequestModel";
import { LoginResponseModel } from "@models/LoginResponseModel";
import { IAuthenticationProvider } from "@providers/authentication";
import { IHashProvider } from "@providers/hash";
import { i18n } from "@config/i18n";
import { ISessionRepository } from "@repositories/session";

import { Employee, Student } from ".prisma/client";

@injectable()
class LoginService {
  constructor(
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
    @inject("AuthenticationProvider")
    private authenticationProvider: IAuthenticationProvider
  ) {}

  public async execute({
    email,
    password,
  }: LoginRequestModel): Promise<LoginResponseModel> {
    if (!email || !password)
      throw new AppError(400, i18n.__("ErrorLoginCredentials"));

    const hasUser = await this.sessionRepository.findOne(email);
    if (!hasUser) throw new AppError(400, i18n.__("ErrorLoginCredentials"));

    const maxAttempts = Number(env("MAX_LOGIN_ATTEMPTS"));
    if (!maxAttempts)
      throw new AppError(500, i18n.__("ErrorEnvMaxLoginAttempts"));

    if (hasUser.blocked || hasUser.attempts >= maxAttempts)
      throw new AppError(400, i18n.__("ErrorBlockedAccount"));

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

        throw new AppError(400, i18n.__("ErrorLoginBlockedAccount"));
      }

      throw new AppError(400, i18n.__("ErrorLoginCredentials"));
    }

    const tokenPayload = {
      id: hasUser.userId,
      avatar: hasUser.user.profile?.avatar,
      name: hasUser.user.name,
      roles: hasUser.user.userGroup.roles.map(
        (item: { role: string }) => item.role
      ),
    };

    const accessToken = this.authenticationProvider.generateToken({
      ...tokenPayload,
      type: "access_token",
    });

    const refreshToken = this.authenticationProvider.generateToken({
      ...tokenPayload,
      type: "refresh_token",
    });

    return {
      email: hasUser.primary,
      name: hasUser.user.name,
      avatar: hasUser.user.profile?.avatar,
      bio: hasUser.user.profile?.bio,
      token: accessToken,
      refreshToken,
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
