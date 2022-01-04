import { cpf as CpfValidator } from "cpf-cnpj-validator";
import { container, inject, injectable } from "tsyringe";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { env } from "@helpers/env";
import { clientConnection } from "@infra/database";
import { CreateUserRequestModel } from "@models/CreateUserRequestModel";
import { User, PrismaPromise, Email, Session } from "@prisma/client";
import { IHashProvider } from "@providers/hash";
import { IRandomTokenProvider } from "@providers/randomToken";
import { IUniqueIdentifierProvider } from "@providers/uniqueIdentifier";
import { IUserRepository } from "@repositories/user";
import { IUserGroupRepository } from "@repositories/userGroup";
import { CreateSessionService } from "@services/session";

@injectable()
class CreateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserGroupRepository")
    private userGroupRepository: IUserGroupRepository,
    @inject("UniqueIdentifierProvider")
    private uniqueIdentifierProvider: IUniqueIdentifierProvider,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
    @inject("RandomTokenProvider")
    private randomTokenProvider: IRandomTokenProvider
  ) {}

  public async execute({
    cpf,
    email,
    name,
  }: CreateUserRequestModel): Promise<Omit<User, "groupId" | "password">> {
    if (cpf && !CpfValidator.isValid(cpf))
      throw new AppError(400, i18n.__("ErrorCpfInvalid"));

    const cpfFormatted = CpfValidator.format(cpf);

    const userId = this.uniqueIdentifierProvider.generate();

    const generatedPassword = this.randomTokenProvider.generatePassword();
    console.log(generatedPassword);
    const hashedPassword = await this.hashProvider.hash(generatedPassword);

    const createSessionService = await container.resolve(CreateSessionService);
    const createSessionOperation = await createSessionService
      .execute({
        email,
        userId,
      })
      .catch((e) => {
        throw e;
      });

    // refatorar
    const nameGroup = env("GROUP_NAME_EMPLOYEE");
    if (!nameGroup) throw new AppError(500, i18n.__("ErrorEnvNameGroup"));

    // to-do: profile

    const userGroup = await this.userGroupRepository.getIdByGroup(nameGroup);
    if (!userGroup) throw new AppError(500, i18n.__("ErrorUserGroupNotFound"));

    const createUserOperation = this.userRepository.save({
      name,
      groupId: userGroup.id,
      createdAt: new Date(),
      id: userId,
      cpf: cpfFormatted,
      password: hashedPassword,
      updatedAt: new Date(),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ groupId: _, password: __, ...user }, ___] =
      await clientConnection.$transaction([
        createUserOperation,
        ...(createSessionOperation as unknown as PrismaPromise<
          Email | Session
        >[]),
      ]);

    return user;
  }
}

export { CreateUserService };
