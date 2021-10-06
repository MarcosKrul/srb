import { container } from "tsyringe";

import { HashProvider, IHashProvider } from "@providers/hash";
import { IPasswordProvider, PasswordProvider } from "@providers/password";
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

container.registerSingleton<IHashProvider>("HashProvider", HashProvider);

container.registerSingleton<IUniqueIdentifierProvider>(
  "UniqueIdentifierProvider",
  UniqueIdentifierProvider
);

container.registerSingleton<IPasswordProvider>(
  "PasswordProvider",
  PasswordProvider
);
