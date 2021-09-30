import { cpf as CpfValidator } from "cpf-cnpj-validator";
import { inject, injectable } from "tsyringe";

import { AppError } from "@error/AppError";
import { Employee } from "@prisma/client";
import { IHashProvider } from "@providers/hash";
import { IPasswordProvider } from "@providers/password";
import { IUniqueIdentifierProvider } from "@providers/uniqueIdentifier";
import { IEmployeeRepository } from "@repositories/employee";
import { IUserGroupRepository } from "@repositories/userGroup";

import { ICreateEmployeeModel } from "./models/ICreateEmployeeModel";

@injectable()
class CreateEmployeeService {
  constructor(
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
    emailId,
    name,
  }: ICreateEmployeeModel): Promise<Employee> {
    if (CpfValidator.isValid(cpf))
      throw new AppError(400, AppError.getErrorMessage("ErrorCpfInvalid"));

    const userGroup = await this.userGroupRepository.getIdByGroup("EMPLOYEE");
    if (!userGroup)
      throw new AppError(
        500,
        AppError.getErrorMessage("ErrorUserGroupNotFound")
      );

    const generatedPassword = this.passwordProvider.generate();
    const hashedPassword = await this.hashProvider.hash(generatedPassword);

    const saved = await this.employeeRepository.save({
      name,
      password: hashedPassword,
      emailId,
      cpf,
      groupId: userGroup.id,
      createdAt: new Date(),
      id: this.uniqueIdentifierProvider.generate(),
    });

    return saved;
  }
}

export { CreateEmployeeService };
