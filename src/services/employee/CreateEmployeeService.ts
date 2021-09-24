import { inject, injectable } from "tsyringe";

import { Employee } from "@prisma/client";
import { IEmployeeRepository } from "@repositories/employee";

@injectable()
class CreateEmployeeService {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  public async execute(employee: Employee): Promise<Employee> {
    const saved = await this.employeeRepository.save({
      ...employee,
    });

    return saved;
  }
}

export { CreateEmployeeService };
