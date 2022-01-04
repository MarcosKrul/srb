import { IPaginationResponse } from "@infra/http";
import { UserListResponseModel } from "@models/UserListResponseModel";
import { User, PrismaPromise } from "@prisma/client";

interface IUserRepository {
  save(user: User): PrismaPromise<User>;
  get([take, skip]: [number, number]): Promise<
    IPaginationResponse<UserListResponseModel>
  >;
}

export { IUserRepository };
