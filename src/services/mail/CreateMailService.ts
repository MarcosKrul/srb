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

    // to-do: validar se email ja existe e se e valido
    const response = this.mailRepository.save(email);
    return response;
  }
}

export { CreateMailService };
