import { SendEmailModel } from "@models/common/SendEmailModel";

interface IMailProvider {
  send(data: SendEmailModel): Promise<void>;
}

export { IMailProvider };
