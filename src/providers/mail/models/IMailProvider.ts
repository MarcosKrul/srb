import { SendEmailModel } from "@models/SendEmailModel";

interface IMailProvider {
  send(data: SendEmailModel): Promise<void>;
}

export { IMailProvider };
