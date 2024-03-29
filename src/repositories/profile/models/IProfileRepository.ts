import { CreateProfileModel } from "@models/user/CreateProfileModel";
import { PrismaPromise, Profile } from "@prisma/client";

interface IProfileRepository {
  save(profile: CreateProfileModel): PrismaPromise<Profile>;
}

export { IProfileRepository };
