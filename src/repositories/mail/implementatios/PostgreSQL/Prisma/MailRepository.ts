import { clientConnection } from "@infra/database";
import { Email } from "@prisma/client";
import { IMailRepository } from "@repositories/mail";

class MailRepository implements IMailRepository {
  constructor(private prisma = clientConnection) {}

  async findOne(email: string): Promise<Email | null> {
    const response = await this.prisma.email.findFirst({
      where: { primary: email },
    });

    return response;
  }

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
