import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { ForgotPasswdRequestModel } from "@models/ForgotPasswdRequestModel";
import {
  Email,
  LoginControl,
  PrismaPromise,
  ForgotPasswd,
  User,
} from "@prisma/client";

interface ISessionRepository {
  incrementAttempts(
    session: Omit<LoginControl, "password" | "primary">
  ): Promise<LoginControl>;
  findOne(email: string): Promise<any>;
  getIdByEmail(email: string): Promise<string | null>;
  save(data: CreateSessionRequestModel): PrismaPromise<LoginControl | Email>[];
  forgotPasswd(data: ForgotPasswdRequestModel): Promise<void>;
  resetPasswd(userId: string): Promise<ForgotPasswd | null>;
  alterPasswd(userId: string, password: string): PrismaPromise<User>;
  deleteResetPasswd(userId: string): PrismaPromise<ForgotPasswd>;
}

export { ISessionRepository };
