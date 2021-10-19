interface IRandomTokenProvider {
  generatePassword(): string;
  generateForgotPasswd(): string;
}

export { IRandomTokenProvider };
