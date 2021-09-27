import { UserGroup } from "@prisma/client";

interface IUserGroupRepository {
  getIdByGroup(group: string): Promise<UserGroup | null>;
}

export { IUserGroupRepository };
