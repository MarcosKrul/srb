import { clientConnection } from "@infra/database";
import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { ForgotPasswdRequestModel } from "@models/ForgotPasswdRequestModel";
import { Email, Session, PrismaPromise, ForgotPasswd } from "@prisma/client";
import { ISessionRepository } from "@repositories/session";

class SessionRepository implements ISessionRepository {
  constructor(private prisma = clientConnection) {}

  async findOne(email: string): Promise<
    | (Session & {
        user: {
          name: string;
          userGroup: { roles: { role: string }[]; group: string };
          profile: { avatar: string; bio: string } | null;
          student: { grade: string; registration: string } | null;
          employee: { cpf: string } | null;
        };
      })
    | null
  > {
    const response = await this.prisma.session.findFirst({
      where: { primary: email },
      include: {
        user: {
          select: {
            name: true,
            userGroup: {
              select: {
                roles: { select: { role: true } },
                group: true,
              },
            },
            profile: {
              select: { avatar: true, bio: true },
            },
            employee: {
              select: { cpf: true },
            },
            student: {
              select: { grade: true, registration: true },
            },
          },
        },
      },
    });

    return response;
  }

  async incrementAttempts({
    userId,
    attempts,
    blocked,
  }: Omit<Session, "password" | "primary">): Promise<Session> {
    const incrementOperation = this.prisma.session.update({
      where: { userId },
      data: { attempts, blocked },
    });

    return incrementOperation;
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

  async forgotPasswd({
    expiresIn,
    token,
    userId,
  }: ForgotPasswdRequestModel): Promise<void> {
    await this.prisma.forgotPasswd.upsert({
      where: { userId },
      update: {
        token,
        expiresIn,
      },
      create: {
        userId,
        token,
        expiresIn,
      },
    });
  }

  async resetPasswd(userId: string): Promise<ForgotPasswd | null> {
    const response = await this.prisma.forgotPasswd.findFirst({
      where: { userId },
    });

    return response;
  }

  deleteResetPasswd(userId: string): PrismaPromise<ForgotPasswd> {
    const operation = this.prisma.forgotPasswd.delete({
      where: { userId },
    });

    return operation;
  }

  alterPasswd(userId: string, password: string): PrismaPromise<Session> {
    const operation = this.prisma.session.update({
      where: { userId },
      data: { password },
    });

    return operation;
  }
}

export { SessionRepository };
