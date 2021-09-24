import { clientConnection } from "@infra/database";
import { Email } from "@prisma/client";
import { IMailRepository } from "@repositories/mail";

class MailRepository implements IMailRepository {
  constructor(private prisma = clientConnection) {}

  async save(email: string): Promise<Email> {
    const response = await this.prisma.email.create({
      data: {
        primary: email,
        advertising: true,
        notifications: true,
        secondary: "",
      },
    });

    return response;
  }
}

export { MailRepository };
