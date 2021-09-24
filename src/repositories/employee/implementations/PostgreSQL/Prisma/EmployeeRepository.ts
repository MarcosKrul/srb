import { clientConnection } from "@infra/database";
import { Employee } from "@prisma/client";
import { IEmployeeRepository } from "@repositories/employee/models/IEmployeeRepository";

class EmployeeRepository implements IEmployeeRepository {
  constructor(private prisma = clientConnection) {}

  public async getAll(): Promise<Employee[]> {
    const response = await this.prisma.employee.findMany();
    return response;
  }

  public async save(employee: Employee): Promise<Employee> {
    const response = await this.prisma.employee.create({
      data: {
        cpf: employee.cpf,
        name: employee.name,
        id: employee.id,
        createdAt: new Date(),
        emailId: employee.emailId,
        groupId: employee.groupId,
        password: employee.password,
      },
    });
    return response;
  }
}

export { EmployeeRepository };
