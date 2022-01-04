import { clientConnection } from "@infra/database";
import { IPaginationResponse } from "@infra/http";
import { UserListResponseModel } from "@models/UserListResponseModel";
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
        cpf: user.cpf,
        password: user.password,
      },
    });
  }

  public async get([take, skip]: [number, number]): Promise<
    IPaginationResponse<UserListResponseModel>
  > {
    const [totalItens, itens] = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        select: {
          id: true,
          cpf: true,
          name: true,
          createdAt: true,
          email: {
            select: { email: true },
            where: { primary: true },
          },
        },
        take,
        skip,
        orderBy: { createdAt: "asc" },
      }),
    ]);

    return {
      itens: itens.map((item) => ({
        ...item,
        email: item.email[0].email,
      })),
      totalItens,
    };
  }
}

export { UserRepository };
