import { clientConnection } from "@infra/database";
import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { FindUserByEmailResponseModel } from "@models/FindUserByEmailResponseModel";
import { ForgotPasswdRequestModel } from "@models/ForgotPasswdRequestModel";
import { GetUserByEmailResponseModel } from "@models/GetUserByEmailResponseModel";
import {
  Email,
  LoginControl,
  PrismaPromise,
  ForgotPasswd,
  User,
} from "@prisma/client";
import { ISessionRepository } from "@repositories/session";

class SessionRepository implements ISessionRepository {
  constructor(private prisma = clientConnection) {}

  async getUserByEmail(email: string): Promise<GetUserByEmailResponseModel> {
    const response = await this.prisma.email.findFirst({
      where: { email, primary: true },
      include: {
        user: {
          select: {
            name: true,
            password: true,
            loginControl: {
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

  async findOne(email: string): Promise<FindUserByEmailResponseModel | null> {
    const response = await this.prisma.email.findFirst({
      where: { email, primary: true },
      select: {
        userId: true,
        email: true,
        user: {
          select: { name: true },
        },
      },
    });

    return response;
  }

  async incrementAttempts({
    userId,
    attempts,
    blocked,
  }: Omit<LoginControl, "password" | "primary">): Promise<LoginControl> {
    const incrementOperation = this.prisma.loginControl.update({
      where: { userId },
      data: { attempts, blocked },
    });

    return incrementOperation;
  }

  save({
    email,
    userId,
  }: CreateSessionRequestModel): PrismaPromise<LoginControl | Email>[] {
    const mailOperation = this.prisma.email.create({
      data: {
        email,
        userId,
        advertising: true,
        notifications: true,
        primary: true,
      },
    });

    const sessionOperation = this.prisma.loginControl.create({
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
