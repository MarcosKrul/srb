import { CreateSessionRequestModel } from "@models/CreateSessionRequestModel";
import { Email, Session, PrismaPromise } from "@prisma/client";

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
}

export { ISessionRepository };
