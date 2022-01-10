import { validate } from "email-validator";
import { inject, injectable } from "tsyringe";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { Email, LoginControl, PrismaPromise } from "@prisma/client";
import { ISessionRepository } from "@repositories/session";

@injectable()
class CreateSessionService {
  constructor(
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository
  ) {}

  public async execute({
    email,
    userId,
  }: CreateSessionRequestModel): Promise<
    PrismaPromise<LoginControl | Email>[]
  > {
    if (!email) throw new AppError(400, i18n.__("ErrorEmailRequired"));

    if (!validate(email)) throw new AppError(400, i18n.__("ErrorEmailInvalid"));

    const hasUser = await this.sessionRepository.findOne(email);
    if (hasUser) throw new AppError(400, i18n.__("ErrorEmailAlreadyExits"));

    const response = this.sessionRepository.save({ email, userId });
    return response;
  }
}

export { CreateSessionService };
