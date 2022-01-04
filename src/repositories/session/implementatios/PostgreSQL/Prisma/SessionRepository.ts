import { clientConnection } from "@infra/database";
import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { ForgotPasswdRequestModel } from "@models/ForgotPasswdRequestModel";
import {
  Email,
  Session,
  PrismaPromise,
  ForgotPasswd,
  User,
} from "@prisma/client";
import { ISessionRepository } from "@repositories/session";

class SessionRepository implements ISessionRepository {
  constructor(private prisma = clientConnection) {}

  async findOne(email: string): Promise<any> {
    const response = await this.prisma.email.findFirst({
      where: { email, primary: true },
      include: {
        user: {
          select: {
            name: true,
            password: true,
            session: {
              select: {
                attempts: true,
                blocked: true,
              },
            },
            userGroup: { select: { roles: true } },
            profile: { select: { avatar: true, bio: true } },
          },
        },
      },
    });

    return response;
  }

  async getIdByEmail(email: string): Promise<string | null> {
    const response = await this.prisma.email.findFirst({
      where: { email },
      select: { userId: true },
    });

    return response ? response.userId : null;
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
    userId,
  }: CreateSessionRequestModel): PrismaPromise<Session | Email>[] {
    const mailOperation = this.prisma.email.create({
      data: {
        email,
        userId,
        advertising: true,
        notifications: true,
        primary: true,
      },
    });

    const sessionOperation = this.prisma.session.create({
      data: {
        attempts: 0,
        blocked: false,
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

  alterPasswd(id: string, password: string): PrismaPromise<User> {
    const operation = this.prisma.user.update({
      where: { id },
      data: { password },
    });

    return operation;
  }
}

export { SessionRepository };
