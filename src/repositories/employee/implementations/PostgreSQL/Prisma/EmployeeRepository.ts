import { clientConnection } from "@infra/database";
import { Employee, PrismaPromise } from "@prisma/client";
import { IEmployeeRepository } from "@repositories/employee/models/IEmployeeRepository";

class EmployeeRepository implements IEmployeeRepository {
  constructor(private prisma = clientConnection) {}

  public async getAll(): Promise<Employee[]> {
    const response = await this.prisma.employee.findMany();
    return response;
  }

  public save(employee: Employee): PrismaPromise<Employee> {
    return this.prisma.employee.create({
      data: {
        cpf: employee.cpf,
        id: employee.id,
      },
    });
  }
}

export { EmployeeRepository };
