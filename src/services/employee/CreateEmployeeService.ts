import { cpf as CpfValidator } from "cpf-cnpj-validator";
import { container, inject, injectable } from "tsyringe";

import { AppError } from "@error/AppError";
import { env } from "@helpers/env";
import { clientConnection } from "@infra/database";
import { CreateEmployeeRequestModel } from "@models/CreateEmployeeRequestModel";
import { Employee, PrismaPromise, Email, Session } from "@prisma/client";
import { IHashProvider } from "@providers/hash";
import { IPasswordProvider } from "@providers/password";
import { IUniqueIdentifierProvider } from "@providers/uniqueIdentifier";
import { IEmployeeRepository } from "@repositories/employee";
import { IUserRepository } from "@repositories/user";
import { IUserGroupRepository } from "@repositories/userGroup";
import { CreateSessionService } from "@services/session";

@injectable()
class CreateEmployeeService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,
    @inject("UserGroupRepository")
    private userGroupRepository: IUserGroupRepository,
    @inject("UniqueIdentifierProvider")
    private uniqueIdentifierProvider: IUniqueIdentifierProvider,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
    @inject("PasswordProvider")
    private passwordProvider: IPasswordProvider
  ) {}

  public async execute({
    cpf,
    email,
    name,
  }: CreateEmployeeRequestModel): Promise<Employee> {
    if (CpfValidator.isValid(cpf))
      throw new AppError(400, AppError.getErrorMessage("ErrorCpfInvalid"));

    const userId = this.uniqueIdentifierProvider.generate();

    const generatedPassword = this.passwordProvider.generate();
    const hashedPassword = await this.hashProvider.hash(generatedPassword);

    const createSessionService = await container.resolve(CreateSessionService);
    const createSessionOperation = await createSessionService
      .execute({
        email,
        password: hashedPassword,
        userId,
      })
      .catch((e) => {
        throw e;
      });

    const nameGroup = env("GROUP_NAME_EMPLOYEE");
    if (!nameGroup)
      throw new AppError(500, AppError.getErrorMessage("ErrorEnvNameGroup"));

    const userGroup = await this.userGroupRepository.getIdByGroup(nameGroup);
    if (!userGroup)
      throw new AppError(
        500,
        AppError.getErrorMessage("ErrorUserGroupNotFound")
      );

    const createUserOperation = this.userRepository.save({
      name,
      groupId: userGroup.id,
      createdAt: new Date(),
      id: userId,
    });

    const cpfFormatted = CpfValidator.format(cpf);

    const createEmployeeOperation = this.employeeRepository.save({
      cpf: cpfFormatted,
      id: userId,
    });

    const [, employee] = await clientConnection.$transaction([
      createUserOperation,
      createEmployeeOperation,
      ...(createSessionOperation as unknown as PrismaPromise<
        Email | Session
      >[]),
    ]);

    return employee;
  }
}

export { CreateEmployeeService };
