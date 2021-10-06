import { clientConnection } from "@infra/database";
import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { Email, Session, PrismaPromise } from "@prisma/client";
import { ISessionRepository } from "@repositories/session";

class SessionRepository implements ISessionRepository {
  constructor(private prisma = clientConnection) {}

  async findOne(email: string): Promise<Email | null> {
    const response = await this.prisma.email.findFirst({
      where: { primary: email },
    });

    return response;
  }

  save({
    email,
    password,
    userId,
  }: CreateSessionRequestModel): PrismaPromise<Session | Email>[] {
    const mailOperation = this.prisma.email.create({
      data: {
        primary: email,
        advertising: true,
        notifications: true,
        secondary: "",
      },
    });

    const sessionOperation = this.prisma.session.create({
      data: {
        attempts: 0,
        blocked: false,
        password,
        primary: email,
        userId,
      },
    });

    return [mailOperation, sessionOperation];
  }
}

export { SessionRepository };
