import { Employee } from "@prisma/client";

interface IEmployeeRepository {
  read(): Employee[];
}

export { IEmployeeRepository };
