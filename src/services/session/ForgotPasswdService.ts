import { inject, injectable } from "tsyringe";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { IRandomTokenProvider } from "@providers/randomToken";
import { ISessionRepository } from "@repositories/session";

@injectable()
class ForgotPasswdService {
  constructor(
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository,
    @inject("RandomTokenProvider")
    private randomTokenProvider: IRandomTokenProvider
  ) {}

  public async execute(email: string): Promise<void> {
    if (!email) throw new AppError(400, i18n.__("ErrorEmailRequired"));

    const userId = await this.sessionRepository.getIdByEmail(email);
    if (!userId) throw new AppError(400, i18n.__("ErrorEmailNotFound"));

    const expiresIn = ((): Date => {
      const date = new Date();
      date.setHours(date.getHours() + 1);
      return date;
    })();

    const token = this.randomTokenProvider.generateForgotPasswd();

    await this.sessionRepository.forgotPasswd({
      token,
      expiresIn,
      userId,
    });

    // mandar email
  }
}

export { ForgotPasswdService };
