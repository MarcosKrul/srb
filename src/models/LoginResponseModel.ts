import { Employee, Student } from "@prisma/client";

type LoginResponseModel = {
  token: string;
  refreshToken: string;

  name: string;
  email: string;
  bio?: string;
  avatar?: string;

  entity: {
    type: string;
    data: Omit<Employee | Student, "id">;
  };
};

export { LoginResponseModel };
