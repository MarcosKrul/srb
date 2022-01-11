import { clientConnection } from "@infra/database";
import { CreateProfileModel } from "@models/user/CreateProfileModel";
import { PrismaPromise, Profile } from "@prisma/client";
import { IProfileRepository } from "@repositories/profile";

class ProfileRepository implements IProfileRepository {
  constructor(private prisma = clientConnection) {}

  save({ avatar, bio, userId }: CreateProfileModel): PrismaPromise<Profile> {
    return this.prisma.profile.create({
      data: {
        avatar,
        bio,
        userId,
        updatedAt: new Date(),
      },
    });
  }
}

export { ProfileRepository };
