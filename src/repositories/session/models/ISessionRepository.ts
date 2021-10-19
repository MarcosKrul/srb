import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { ForgotPasswdRequestModel } from "@models/ForgotPasswdRequestModel";
import { Email, Session, PrismaPromise, ForgotPasswd } from "@prisma/client";

interface ISessionRepository {
  incrementAttempts(
    session: Omit<Session, "password" | "primary">
  ): Promise<Session>;
  findOne(email: string): Promise<
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
  >;
  save(data: CreateSessionRequestModel): PrismaPromise<Session | Email>[];
  forgotPasswd(data: ForgotPasswdRequestModel): Promise<void>;
  resetPasswd(userId: string): Promise<ForgotPasswd | null>;
  alterPasswd(userId: string, password: string): PrismaPromise<Session>;
  deleteResetPasswd(userId: string): PrismaPromise<ForgotPasswd>;
}

export { ISessionRepository };
