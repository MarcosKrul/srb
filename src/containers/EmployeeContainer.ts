import { container } from "tsyringe";

import {
  IRandomTokenProvider,
  RandomTokenProvider,
} from "@providers/randomToken";
import {
  IUniqueIdentifierProvider,
  UniqueIdentifierProvider,
} from "@providers/uniqueIdentifier";
import {
  EmployeeRepository,
  IEmployeeRepository,
} from "@repositories/employee";
import { IUserRepository, UserRepository } from "@repositories/user";
import {
  IUserGroupRepository,
  UserGroupRepository,
} from "@repositories/userGroup";

container.registerSingleton<IEmployeeRepository>(
  "EmployeeRepository",
  EmployeeRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUserGroupRepository>(
  "UserGroupRepository",
  UserGroupRepository
);

container.registerSingleton<IUniqueIdentifierProvider>(
  "UniqueIdentifierProvider",
  UniqueIdentifierProvider
);

container.registerSingleton<IRandomTokenProvider>(
  "RandomTokenProvider",
  RandomTokenProvider
);
