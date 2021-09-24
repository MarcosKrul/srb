import { Employee } from "@prisma/client";

interface IEmployeeRepository {
  getAll(): Promise<Employee[]>;

  save(employee: Employee): Promise<Employee>;
}

export { IEmployeeRepository };
