import { Router } from "express";

import { RoutesPrefix } from "@common/RoutesPrefix";

import { routes as sessionRoutes } from "./session.routes";
import { routes as userRoutes } from "./user.routes";

const routes = Router();

routes.use(RoutesPrefix.SESSION, sessionRoutes);
routes.use(RoutesPrefix.USER, userRoutes);

export { routes };
