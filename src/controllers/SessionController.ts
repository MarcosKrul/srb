import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@error/AppError";
import { IResponseMessage } from "@infra/http";
import { LoginResponseModel } from "@models/LoginResponseModel";
import {
  ForgotPasswdService,
  LoginService,
  ResetPasswdService,
} from "@services/session";
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

  public async forgotPasswd(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      const forgotPasswdService = await container.resolve(ForgotPasswdService);

      await forgotPasswdService.execute(email);

      return res.status(200).json({
        success: true,
        message: AppSuccess.getSuccessMessage("SuccessForgotPasswd"),
      });
    } catch (error) {
      return res.status(AppError.getErrorStatusCode(error)).json({
        success: false,
        message: AppError.getErrorMessage("ErrorForgotPasswd", error),
      });
    }
  }

  public async resetPasswd(req: Request, res: Response): Promise<Response> {
    try {
      const { token } = req.params;
      const { email, password, confirmPassword } = req.body;

      const resetPasswdService = await container.resolve(ResetPasswdService);

      await resetPasswdService.execute({
        confirmPassword,
        email,
        password,
        token,
      });

      return res.status(200).json({
        success: true,
        message: AppSuccess.getSuccessMessage("SuccessResetPasswd"),
      });
    } catch (error) {
      return res.status(AppError.getErrorStatusCode(error)).json({
        success: false,
        message: AppError.getErrorMessage("ErrorForgotPasswd", error),
      });
    }
  }
}

export { SessionController };
