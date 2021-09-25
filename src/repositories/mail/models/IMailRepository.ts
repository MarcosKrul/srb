import { Email } from "@prisma/client";

interface IMailRepository {
  findOne(email: string): Promise<Email | null>;
  save(email: string): Promise<Email>;
}

export { IMailRepository };
