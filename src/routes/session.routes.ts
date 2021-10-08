import { Router } from "express";

import { RoutesPath } from "@common/RoutesPath";
import { SessionController } from "@controllers/SessionController";

const routes = Router();
const sessionController = new SessionController();

routes.post(RoutesPath.LOGIN_ROUTE, sessionController.login);

export { routes };
