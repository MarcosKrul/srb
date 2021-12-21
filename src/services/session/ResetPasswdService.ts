import { inject, injectable } from "tsyringe";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { clientConnection } from "@infra/database";
import { ResetPasswdRequestModel } from "@models/ResetPasswdRequestModel";
import { IHashProvider } from "@providers/hash";
import { ISessionRepository } from "@repositories/session";

@injectable()
class ResetPasswdService {
  constructor(
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
    token,
    confirmPassword,
  }: ResetPasswdRequestModel): Promise<void> {
    if (password !== confirmPassword)
      throw new AppError(400, i18n.__("ErrorDifferentPasswords"));

    const hasUser = await this.sessionRepository.findOne(email || "");
    if (!hasUser) throw new AppError(404, i18n.__("ErrorEmailNotFound"));

    const credentials = await this.sessionRepository.resetPasswd(
      hasUser.userId
    );

    if (!credentials)
      throw new AppError(400, i18n.__("ErrorNoRequestResetPasswd"));

    if (credentials.token !== token)
      throw new AppError(400, i18n.__("ErrorInvalidResetPasswdToken"));

    if (new Date() > credentials.expiresIn) {
      await clientConnection.$transaction([
        this.sessionRepository.deleteResetPasswd(hasUser.userId),
      ]);

      throw new AppError(400, i18n.__("ErrorResetPasswdExpires"));
    }

    const hashdPassword = await this.hashProvider.hash(password);

    const alterPasswdOperation = this.sessionRepository.alterPasswd(
      hasUser.userId,
      hashdPassword
    );

    const deleteResetPasswdOperation = this.sessionRepository.deleteResetPasswd(
      hasUser.userId
    );

    await clientConnection.$transaction([
      alterPasswdOperation,
      deleteResetPasswdOperation,
    ]);
  }
}

export { ResetPasswdService };
