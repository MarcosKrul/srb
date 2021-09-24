import { Email } from "@prisma/client";

interface IMailRepository {
  save(email: string): Promise<Email>;
}

export { IMailRepository };
