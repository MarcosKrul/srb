import { Request, Response } from "express";
import { container } from "tsyringe";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { IPaginationResponse, IResponseMessage } from "@infra/http";
import { UpdateUserProfileRequestModel } from "@models/user/UpdateUserProfileRequestModel";
import { UserListResponseModel } from "@models/user/UserListResponseModel";
import { Profile, User } from "@prisma/client";
import {
  CreateUserService,
  ListUsersService,
  UpdateUserProfileService,
} from "@services/user";

class UserController {
  public async read(
    req: Request,
    res: Response<IResponseMessage<IPaginationResponse<UserListResponseModel>>>
  ): Promise<Response> {
    try {
      const { page, size } = req.query;

      const listUsersService = await container.resolve(ListUsersService);

      const response = await listUsersService.execute({
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
        message: AppError.getErrorMessage(error) || i18n.__("ErrorReadUsers"),
      });
    }
  }

  public async create(
    req: Request,
    res: Response<IResponseMessage<Omit<User, "groupId" | "password">>>
  ): Promise<Response> {
    try {
      const { email, name, cpf } = req.body;

      const createUserService = await container.resolve(CreateUserService);

      const user = await createUserService.execute({
        cpf,
        name,
        email,
      });

      return res.status(200).json({
        success: true,
        data: user,
        message: i18n.__("SuccessGeneric"),
      });
    } catch (error) {
      return res.status(AppError.getErrorStatusCode(error)).json({
        success: false,
        message:
          AppError.getErrorMessage(error) || i18n.__("ErrorCreateEmployee"),
      });
    }
  }

  public async updateProfile(
    req: Request,
    res: Response<IResponseMessage<Omit<Profile, "userId">>>
  ): Promise<Response> {
    try {
      const { id: userId } = req.params;

      const { bio } = ((): UpdateUserProfileRequestModel => {
        if (req.body.infos) return JSON.parse(req.body.infos);
        return <UpdateUserProfileRequestModel>{};
      })();

      const updateUserProfileService = await container.resolve(
        UpdateUserProfileService
      );

      const response = await updateUserProfileService.execute({
        bio,
        avatar: req.file?.filename,
        userId,
      });

      return res.status(200).json({
        success: true,
        data: response,
        message: i18n.__("SuccessGeneric"),
      });
    } catch (error) {
      return res.status(AppError.getErrorStatusCode(error)).json({
        success: false,
        message:
          AppError.getErrorMessage(error) || i18n.__("ErrorUpdateUserProfile"),
      });
    }
  }
}

export { UserController };
