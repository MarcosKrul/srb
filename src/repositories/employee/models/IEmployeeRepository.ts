import { Employee, PrismaPromise } from "@prisma/client";

interface IEmployeeRepository {
  getAll(): Promise<Employee[]>;

  save(employee: Employee): PrismaPromise<Employee>;
}

export { IEmployeeRepository };
