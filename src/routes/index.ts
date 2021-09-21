import { Router } from "express";

import { RoutesPath } from "@common/RoutesPath";

import { routes as employeeRoutes } from "./employee.routes";

const routes = Router();

routes.use(RoutesPath.EMPLOYEE_ROUTES_PREFIX, employeeRoutes);

export { routes };
