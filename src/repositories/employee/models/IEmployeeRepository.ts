import { IPaginationResponse } from "@infra/http";
import { Employee, PrismaPromise } from "@prisma/client";

interface IEmployeeRepository {
  getAll([take, skip]: [number, number]): Promise<
    IPaginationResponse<Employee>
  >;

  save(employee: Employee): PrismaPromise<Employee>;
}

export { IEmployeeRepository };
