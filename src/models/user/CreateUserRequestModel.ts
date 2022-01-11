type CreateUserRequestModel = {
  cpf: string;
  name: string;
  email: string;

  profile?: {
    avatar?: string;
    bio?: string;
  };
};

export { CreateUserRequestModel };
