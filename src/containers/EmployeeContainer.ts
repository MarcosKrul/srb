import { container } from "tsyringe";

import { HashProvider, IHashProvider } from "@providers/hash";
import {
  EmployeeRepository,
  IEmployeeRepository,
} from "@repositories/employee";

container.registerSingleton<IEmployeeRepository>(
  "EmployeeRepository",
  EmployeeRepository
);

container.registerSingleton<IHashProvider>("HashProvider", HashProvider);
