import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { Email, Session, PrismaPromise } from "@prisma/client";

interface ISessionRepository {
  findOne(email: string): Promise<Email | null>;
  save(data: CreateSessionRequestModel): PrismaPromise<Session | Email>[];
}

export { ISessionRepository };
