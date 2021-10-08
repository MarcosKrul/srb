import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@error/AppError";
import { IResponseMessage } from "@infra/http";
import { LoginResponseModel } from "@models/LoginResponseModel";
import { LoginService } from "@services/session/LoginService";
import { AppSuccess } from "@success/AppSuccess";

class SessionController {
  public async login(
    req: Request,
    res: Response<IResponseMessage<LoginResponseModel>>
  ): Promise<Response> {
    try {
      const { email, password } = req.body;

      const loginService = await container.resolve(LoginService);

      const response = await loginService.execute({
        email,
        password,
      });

      return res.status(200).json({
        success: true,
        data: response,
        message: AppSuccess.getSuccessMessage("GenericSuccess"),
      });
    } catch (error) {
      return res.status(AppError.getErrorStatusCode(error)).json({
        success: false,
        message: AppError.getErrorMessage("ErrorLogin", error),
      });
    }
  }
}

export { SessionController };
