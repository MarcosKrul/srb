import { inject, injectable } from "tsyringe";

import { RoutesPath } from "@common/RoutesPath";
import { RoutesPrefix } from "@common/RoutesPrefix";
import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { env } from "@helpers/env";
import { UpdateUserProfileRequestModel } from "@models/UpdateUserProfileRequestModel";
import { Profile } from "@prisma/client";
import { IUserRepository } from "@repositories/user";

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  public async execute({
    avatar,
    bio,
    userId,
  }: UpdateUserProfileRequestModel): Promise<Omit<Profile, "userId">> {
    const hasUser = await this.userRepository.getById(userId);

    if (!hasUser) throw new AppError(404, i18n.__("ErrorUserNotFound"));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId: _, ...profile } = await this.userRepository.updateProfile({
      userId,
      bio,
      avatar: `${env("BASE_URL")}${RoutesPrefix.USER}${
        RoutesPath.AVATAR_FILES
      }/${avatar}`,
    });

    return profile;
  }
}

export { UpdateUserProfileService };
