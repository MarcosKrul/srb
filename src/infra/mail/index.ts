import { createTransport, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { mail } from "@config/mail";

const MailTransporter: Transporter<SMTPTransport.SentMessageInfo> =
  createTransport(mail);

export { MailTransporter };
