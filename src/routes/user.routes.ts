import { Router } from "express";

import { RoutesPath } from "@common/RoutesPath";
import { UserController } from "@controllers/UserController";
import { ensureUserAuthenticatedMiddleware } from "@middlewares/ensureUserAuthenticatedMiddleware";

const routes = Router();
const userController = new UserController();

routes.get(
  RoutesPath.READING,
  ensureUserAuthenticatedMiddleware,
  userController.read
);

routes.post(RoutesPath.CREATION, userController.create);

export { routes };
