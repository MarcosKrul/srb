import { clientConnection } from "@infra/database";
import { User, PrismaPromise } from "@prisma/client";
import { IUserRepository } from "@repositories/user/models/IUserRepository";

class UserRepository implements IUserRepository {
  constructor(private prisma = clientConnection) {}

  public save(user: User): PrismaPromise<User> {
    return this.prisma.user.create({
      data: {
        id: user.id,
        createdAt: user.createdAt,
        name: user.name,
        groupId: user.groupId,
      },
    });
  }
}

export { UserRepository };
