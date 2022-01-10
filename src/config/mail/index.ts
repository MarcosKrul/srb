import SMTPConnection from "nodemailer/lib/smtp-connection";

import { env } from "@helpers/env";

const mail: SMTPConnection.Options = {
  host: env("MAIL_HOST"),
  port: Number(env("MAIL_PORT")),
  auth: {
    user: env("MAIL_USER"),
    pass: env("MAIL_PASSWORD"),
  },
};

export { mail };
