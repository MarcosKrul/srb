type LoginResponseModel = {
  token: string;
  refreshToken: string;

  name: string;
  email: string;
  bio?: string;
  avatar?: string;
};

export { LoginResponseModel };
