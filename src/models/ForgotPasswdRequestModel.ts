type ForgotPasswdRequestModel = {
  userId: string;
  token: string;
  expiresIn: Date;
};

export { ForgotPasswdRequestModel };
