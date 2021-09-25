import { validate } from "email-validator";
import { inject, injectable } from "tsyringe";

import { AppError } from "@error/AppError";
import { Email } from "@prisma/client";
import { IMailRepository } from "@repositories/mail";

@injectable()
class CreateMailService {
  constructor(
    @inject("MailRepository")
    private mailRepository: IMailRepository
  ) {}

  public async execute(email: string): Promise<Email> {
    if (!email)
      throw new AppError(400, AppError.getErrorMessage("ErrorEmailRequired"));

    if (!validate(email))
      throw new AppError(400, AppError.getErrorMessage("ErrorEmailInvalid"));

    const hasEmail = await this.mailRepository.findOne(email);
    if (hasEmail)
      throw new AppError(
        400,
        AppError.getErrorMessage("ErrorEmailAlreadyExits")
      );

    const response = this.mailRepository.save(email);
    return response;
  }
}

export { CreateMailService };
