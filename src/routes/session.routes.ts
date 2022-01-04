import { Router } from "express";

import { RoutesPath } from "@common/RoutesPath";
import { SessionController } from "@controllers/SessionController";

const routes = Router();
const sessionController = new SessionController();

routes.post(RoutesPath.LOGIN, sessionController.login);

routes.post(RoutesPath.FORGOT_PASSWD, sessionController.forgotPasswd);

routes.post(RoutesPath.RESET_PASSWD, sessionController.resetPasswd);

export { routes };
