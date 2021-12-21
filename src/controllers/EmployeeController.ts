import { Request, Response } from "express";
import { container } from "tsyringe";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { IPaginationResponse, IResponseMessage } from "@infra/http";
import { Employee, User } from "@prisma/client";
import {
  CreateEmployeeService,
  ListEmployeesService,
} from "@services/employee";

class EmployeeController {
  public async read(
    req: Request,
    res: Response<IResponseMessage<IPaginationResponse<Employee>>>
  ): Promise<Response> {
    try {
      const { page, size } = req.query;

      const listEmployeesService = await container.resolve(
        ListEmployeesService
      );
      const response = await listEmployeesService.execute({
        page,
        size,
      });

      return res.status(200).json({
        success: true,
        data: response,
        message: i18n.__("SuccessGeneric"),
      });
    } catch (error) {
      return res.status(AppError.getErrorStatusCode(error)).json({
        success: false,
        message: i18n.__("ErrorReadEmployees"),
      });
    }
  }

  public async create(
    req: Request,
    res: Response<IResponseMessage<Omit<Employee & User, "groupId">>>
  ): Promise<Response> {
    try {
      const { email, name, cpf } = req.body;

      const createEmployeeService = await container.resolve(
        CreateEmployeeService
      );

      const employee = await createEmployeeService.execute({
        cpf,
        name,
        email,
      });

      return res.status(200).json({
        success: true,
        data: employee,
        message: i18n.__("SuccessGeneric"),
      });
    } catch (error) {
      return res.status(AppError.getErrorStatusCode(error)).json({
        success: false,
        message: i18n.__("ErrorCreateEmployee"),
      });
    }
  }
}

export { EmployeeController };
