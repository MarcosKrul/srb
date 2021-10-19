import { inject, injectable } from "tsyringe";

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
    if (!email)
      throw new AppError(400, AppError.getErrorMessage("ErrorEmailRequired"));

    const hasUser = await this.sessionRepository.findOne(email);
    if (!hasUser)
      throw new AppError(400, AppError.getErrorMessage("ErrorEmailNotFound"));

    // eslint-disable-next-line func-names
    const expiresIn = (function (): Date {
      const date = new Date();
      date.setHours(date.getHours() + 1);
      return date;
    })();

    const token = this.randomTokenProvider.generateForgotPasswd();

    await this.sessionRepository.forgotPasswd({
      token,
      expiresIn,
      userId: hasUser.userId,
    });

    // mandar email
  }
}

export { ForgotPasswdService };
