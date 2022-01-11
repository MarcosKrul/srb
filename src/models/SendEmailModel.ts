type SendEmailModel<T = any> = {
  to: string;
  from: string;
  subject: string;

  text?: string | Buffer | undefined;
  html?: string | Buffer | undefined;

  template?: string;
  context?: T;
};

export { SendEmailModel };
