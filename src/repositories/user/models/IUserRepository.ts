import { User, PrismaPromise } from "@prisma/client";

interface IUserRepository {
  save(user: User): PrismaPromise<User>;
}

export { IUserRepository };
