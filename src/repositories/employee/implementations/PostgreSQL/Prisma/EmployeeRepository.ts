import { Employee } from "@prisma/client";
import { IEmployeeRepository } from "@repositories/employee/models/IEmployeeRepository";

class EmployeeRepository implements IEmployeeRepository {
  read(): Employee[] {
    return [];
  }
}

export { EmployeeRepository };
