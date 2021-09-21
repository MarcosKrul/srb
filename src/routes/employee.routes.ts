import { Router } from "express";

import { RoutesPath } from "@common/RoutesPath";
import { EmployeeController } from "@controllers/EmployeeController";

const routes = Router();
const employeeController = new EmployeeController();

routes.get(RoutesPath.READING_ROUTE, employeeController.read);

export { routes };
