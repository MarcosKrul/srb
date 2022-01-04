import { inject, injectable } from "tsyringe";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { env } from "@helpers/env";
import { LoginRequestModel } from "@models/LoginRequestModel";
import { LoginResponseModel } from "@models/LoginResponseModel";
import { IAuthenticationProvider } from "@providers/authentication";
import { IHashProvider } from "@providers/hash";
import { ISessionRepository } from "@repositories/session";

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

    const {
      user: hasUser,
      userId,
      email: userEmail,
    } = await this.sessionRepository.findOne(email);
    if (!hasUser) throw new AppError(400, i18n.__("ErrorLoginCredentials"));

    const maxAttempts = Number(env("MAX_LOGIN_ATTEMPTS"));
    if (!maxAttempts)
      throw new AppError(500, i18n.__("ErrorEnvMaxLoginAttempts"));

    if (
      hasUser.loginControl.blocked ||
      hasUser.loginControl.attempts >= maxAttempts
    )
      throw new AppError(400, i18n.__("ErrorBlockedAccount"));

    const matchPassword = await this.hashProvider.compare(
      password,
      hasUser.password
    );

    if (!matchPassword) {
      const sessionUpdated = await this.sessionRepository.incrementAttempts({
        userId,
        attempts: hasUser.loginControl.attempts + 1,
        blocked: hasUser.loginControl.attempts + 1 === maxAttempts,
      });

      if (sessionUpdated.blocked) {
        console.log("TO-DO: Mandar email, conta bloqueda");

        throw new AppError(400, i18n.__("ErrorLoginBlockedAccount"));
      }

      throw new AppError(400, i18n.__("ErrorLoginCredentials"));
    }

    const tokenPayload = {
      id: userId,
      avatar: hasUser.profile?.avatar,
      name: hasUser.name,
    };

    const accessToken = this.authenticationProvider.generateToken({
      ...tokenPayload,
      type: "access_token",
      roles: hasUser.userGroup.roles.map((item: { role: string }) => item.role),
    });

    const refreshToken = this.authenticationProvider.generateToken({
      ...tokenPayload,
      type: "refresh_token",
    });

    return {
      email: userEmail,
      name: hasUser.name,
      avatar: hasUser.profile?.avatar,
      bio: hasUser.profile?.bio,
      token: accessToken,
      refreshToken,
    };
  }
}

export { LoginService };
