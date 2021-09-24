import { inject, injectable } from "tsyringe";

import { Employee } from "@prisma/client";
import { IEmployeeRepository } from "@repositories/employee";

@injectable()
class ListEmployeesService {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  public async execute(): Promise<Employee[]> {
    const employees = await this.employeeRepository.getAll();
    return employees;
  }
}

export { ListEmployeesService };
