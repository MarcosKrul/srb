import { validate } from "email-validator";
import { inject, injectable } from "tsyringe";

import { AppError } from "@error/AppError";
import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { Email, Session, PrismaPromise } from "@prisma/client";
import { ISessionRepository } from "@repositories/session";

@injectable()
class CreateSessionService {
  constructor(
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository
  ) {}

  public async execute({
    email,
    password,
    userId,
  }: CreateSessionRequestModel): Promise<PrismaPromise<Session | Email>[]> {
    if (!email)
      throw new AppError(400, AppError.getErrorMessage("ErrorEmailRequired"));

    if (!validate(email))
      throw new AppError(400, AppError.getErrorMessage("ErrorEmailInvalid"));

    const hasEmail = await this.sessionRepository.findOne(email);
    if (hasEmail)
      throw new AppError(
        400,
        AppError.getErrorMessage("ErrorEmailAlreadyExits")
      );

    const response = this.sessionRepository.save({ email, password, userId });
    return response;
  }
}

export { CreateSessionService };
