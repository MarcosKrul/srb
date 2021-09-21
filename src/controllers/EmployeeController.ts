import { Request, Response } from "express";

import { IResponseMessage } from "@infra/http";

class EmployeeController {
  public async read(
    req: Request,
    res: Response<IResponseMessage<any>>
  ): Promise<Response> {
    return res.status(200).json();
  }
}

export { EmployeeController };
