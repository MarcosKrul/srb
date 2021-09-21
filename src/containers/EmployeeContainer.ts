import { container } from "tsyringe";

import {
  EmployeeRepository,
  IEmployeeRepository,
} from "@repositories/employee";

container.registerSingleton<IEmployeeRepository>(
  "EmployeeRepository",
  EmployeeRepository
);
