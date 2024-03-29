import { IPaginationResponse } from "@infra/http";
import { UpdateUserProfileRequestModel } from "@models/user/UpdateUserProfileRequestModel";
import { UserListResponseModel } from "@models/user/UserListResponseModel";
import { User, PrismaPromise, Profile } from "@prisma/client";

interface IUserRepository {
  save(user: User): PrismaPromise<User>;
  get([take, skip]: [number, number]): Promise<
    IPaginationResponse<UserListResponseModel>
  >;
  updateProfile(data: UpdateUserProfileRequestModel): Promise<Profile>;
  getById(id: string): Promise<User | null>;
}

export { IUserRepository };
