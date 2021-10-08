import { Router } from "express";

import { RoutesPath } from "@common/RoutesPath";

import { routes as employeeRoutes } from "./employee.routes";
import { routes as sessionRoutes } from "./session.routes";

const routes = Router();

routes.use(RoutesPath.SESSION_ROUTES_PREFIX, sessionRoutes);
routes.use(RoutesPath.EMPLOYEE_ROUTES_PREFIX, employeeRoutes);

export { routes };
