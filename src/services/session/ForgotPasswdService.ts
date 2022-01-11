import { inject, injectable } from "tsyringe";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { ForgotPasswdRequestModel } from "@models/session/ForgotPasswdRequestModel";
import { IMailProvider } from "@providers/mail";
import { IRandomTokenProvider } from "@providers/randomToken";
import { ISessionRepository } from "@repositories/session";

@injectable()
class ForgotPasswdService {
  constructor(
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository,
    @inject("RandomTokenProvider")
    private randomTokenProvider: IRandomTokenProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  public async execute({
    baseUrl,
    email,
  }: ForgotPasswdRequestModel): Promise<void> {
    if (!email) throw new AppError(400, i18n.__("ErrorEmailRequired"));

    const hasUser = await this.sessionRepository.findOne(email);
    if (!hasUser) throw new AppError(400, i18n.__("ErrorEmailNotFound"));

    const expiresIn = ((): Date => {
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

    await this.mailProvider.send({
      to: `${hasUser.user.name} <${hasUser.email}>`,
      from: `SRB <srb@suporte.com.br>`,
      subject: i18n.__("MailSubjectForgotPasswd"),
      html: i18n.__mf("MailContentForgotPasswd", [
        hasUser.user.name,
        `${baseUrl}/${token}`,
      ]),
    });
  }
}

export { ForgotPasswdService };
