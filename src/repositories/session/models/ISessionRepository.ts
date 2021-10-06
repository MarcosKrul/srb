import { Email, Session, PrismaPromise } from "@prisma/client";

import { CreateSessionModel } from "./CreateSessionModel";

interface ISessionRepository {
  findOne(email: string): Promise<Email | null>;
  save(data: CreateSessionModel): PrismaPromise<Session | Email>[];
}

export { ISessionRepository };
