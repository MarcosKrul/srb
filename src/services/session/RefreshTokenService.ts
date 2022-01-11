import { inject, injectable } from "tsyringe";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { RefreshTokenResponseModel } from "@models/session/RefreshTokenResponseModel";
import { IAuthenticationProvider } from "@providers/authentication";
import { ISessionRepository } from "@repositories/session";

@injectable()
class RefreshTokenService {
  constructor(
    @inject("AuthenticationProvider")
    private authenticationProvider: IAuthenticationProvider,
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository
  ) {}

  public async execute(
    refreshToken: string
  ): Promise<RefreshTokenResponseModel> {
    if (!refreshToken) throw new AppError(400, i18n.__("ErrorNoRefreshToken"));

    const payload = this.authenticationProvider.decode(refreshToken);

    if (
      !payload ||
      !payload.email ||
      (payload.exp && Date.now() >= payload.exp * 1000) ||
      payload.type !== "refresh_token"
    )
      throw new AppError(400, i18n.__("ErrorInvalidRefreshToken"));

    const valid = this.authenticationProvider.verify(refreshToken);
    if (!valid) throw new AppError(400, "ErrorInvalidRefreshToken");

    const {
      user: hasUser,
      userId,
      email: userEmail,
    } = (await this.sessionRepository.getUserByEmail(payload.email)) || {};

    if (!hasUser) throw new AppError(404, "ErrorUserNotFound");

    const accessToken = this.authenticationProvider.generateToken({
      id: userId,
      avatar: hasUser.profile?.avatar,
      name: hasUser.name,
      roles: hasUser.userGroup.roles.map((item: { role: string }) => item.role),
      type: "access_token",
    });

    const newRefreshToken = this.authenticationProvider.generateToken({
      email: userEmail,
      type: "refresh_token",
    });

    return {
      token: accessToken,
      refreshToken: newRefreshToken,
    };
  }
}

export { RefreshTokenService };
