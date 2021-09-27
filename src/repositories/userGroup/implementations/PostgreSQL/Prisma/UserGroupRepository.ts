import { clientConnection } from "@infra/database";
import { IUserGroupRepository } from "@repositories/userGroup";

import { UserGroup } from ".prisma/client";

class UserGroupRepository implements IUserGroupRepository {
  constructor(private prisma = clientConnection) {}

  async getIdByGroup(group: string): Promise<UserGroup | null> {
    const response = await this.prisma.userGroup.findFirst({
      where: { group },
    });

    return response;
  }
}

export { UserGroupRepository };
