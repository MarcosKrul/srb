import { backgroundProcessesQueue } from "@infra/queue/BackgroundProcessesQueue";
import { IBackgroundProcessQueue } from "@infra/queue/models/IBackgroundProcessQueue";
import { SendEmailModel } from "@models/common/SendEmailModel";
import { IMailProvider } from "@providers/mail";

class MailProvider implements IMailProvider {
  async send(data: SendEmailModel): Promise<void> {
    await (
      backgroundProcessesQueue as IBackgroundProcessQueue<SendEmailModel>
    ).add("SendSimpleEmailJob", data);
  }
}

export { MailProvider };
