import { inject, injectable } from "tsyringe";

import { pagination } from "@helpers/pagination";
import { IPaginationOptions, IPaginationResponse } from "@infra/http";
import { UserListResponseModel } from "@models/UserListResponseModel";
import { IUserRepository } from "@repositories/user";

@injectable()
class ListUsersService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  public async execute(
    options: IPaginationOptions
  ): Promise<IPaginationResponse<UserListResponseModel>> {
    const response = await this.userRepository.get(
      pagination(options || ({} as IPaginationOptions))
    );

    return response;
  }
}

export { ListUsersService };
