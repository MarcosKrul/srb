import { CreateForgotPasswdModel } from "@models/CreateForgotPasswdModel";
import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { FindUserByEmailResponseModel } from "@models/FindUserByEmailResponseModel";
import { GetUserByEmailResponseModel } from "@models/GetUserByEmailResponseModel";
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
  getUserByEmail(email: string): Promise<GetUserByEmailResponseModel>;
  findOne(email: string): Promise<FindUserByEmailResponseModel | null>;
  save(data: CreateSessionRequestModel): PrismaPromise<LoginControl | Email>[];
  forgotPasswd(data: CreateForgotPasswdModel): Promise<void>;
  resetPasswd(userId: string): Promise<ForgotPasswd | null>;
  alterPasswd(userId: string, password: string): PrismaPromise<User>;
  deleteResetPasswd(userId: string): PrismaPromise<ForgotPasswd>;
}

export { ISessionRepository };
