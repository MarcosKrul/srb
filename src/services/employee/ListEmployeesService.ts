import { inject, injectable } from "tsyringe";

import { pagination } from "@helpers/pagination";
import { IPaginationOptions, IPaginationResponse } from "@infra/http";
import { Employee } from "@prisma/client";
import { IEmployeeRepository } from "@repositories/employee";

@injectable()
class ListEmployeesService {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  public async execute(
    options: IPaginationOptions
  ): Promise<IPaginationResponse<Employee>> {
    const response = await this.employeeRepository.getAll(
      pagination(options || ({} as IPaginationOptions))
    );

    return response;
  }
}

export { ListEmployeesService };
