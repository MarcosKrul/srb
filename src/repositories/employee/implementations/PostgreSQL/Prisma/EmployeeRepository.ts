import { clientConnection } from "@infra/database";
import { IPaginationResponse } from "@infra/http";
import { Employee, PrismaPromise } from "@prisma/client";
import { IEmployeeRepository } from "@repositories/employee/models/IEmployeeRepository";

class EmployeeRepository implements IEmployeeRepository {
  constructor(private prisma = clientConnection) {}

  public async getAll([take, skip]: [number, number]): Promise<
    IPaginationResponse<Employee>
  > {
    const [totalItens, itens] = await this.prisma.$transaction([
      this.prisma.employee.count(),
      this.prisma.employee.findMany({
        orderBy: {
          user: { createdAt: "asc" },
        },
        take,
        skip,
      }),
    ]);

    return {
      itens,
      totalItens,
    };
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
