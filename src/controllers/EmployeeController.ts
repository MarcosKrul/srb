import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@error/AppError";
import { IResponseMessage } from "@infra/http";
import { Employee } from "@prisma/client";
import {
  CreateEmployeeService,
  ListEmployeesService,
} from "@services/employee";
import { CreateMailService } from "@services/mail";
import { AppSuccess } from "@success/AppSuccess";

class EmployeeController {
  public async read(
    _: Request,
    res: Response<IResponseMessage<Employee[]>>
  ): Promise<Response> {
    try {
      const listEmployeesService = await container.resolve(
        ListEmployeesService
      );
      const response = await listEmployeesService.execute();

      return res.status(200).json({
        success: true,
        data: response,
        message: AppSuccess.getSuccessMessage("GenericSuccess"),
      });
    } catch (error) {
      return res.status(AppError.getErrorStatusCode(error)).json({
        success: false,
        message: AppError.getErrorMessage("ErrorReadEmployees", error),
      });
    }
  }

  public async create(
    req: Request,
    res: Response<IResponseMessage<Employee>>
  ): Promise<Response> {
    try {
      const { email, name, cpf } = req.body;

      const createMailService = await container.resolve(CreateMailService);
      const mail = await createMailService.execute(email);

      const createEmployeeService = await container.resolve(
        CreateEmployeeService
      );

      const employee = await createEmployeeService.execute({
        cpf,
        name,
        emailId: mail.id,
      });

      return res.status(200).json({
        success: true,
        data: employee,
        message: AppSuccess.getSuccessMessage("GenericSuccess"),
      });
    } catch (error) {
      return res.status(AppError.getErrorStatusCode(error)).json({
        success: false,
        message: AppError.getErrorMessage("ErrorCreateEmployee", error),
      });
    }
  }
}

export { EmployeeController };
