import { MailTransporter } from "@infra/mail";
import { IJob } from "@infra/queue/models/IJob";
import { SendEmailModel } from "@models/common/SendEmailModel";

const job: IJob<SendEmailModel> = {
  key: "SendSimpleEmailJob",
  handle: ({ data }, done) => {
    MailTransporter.sendMail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      html: data.html,
    });

    done();
  },
};

export { job };
