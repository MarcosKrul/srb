type FindUserByEmailResponseModel = {
  userId: string;
  email: string;
  user: {
    name: string;
  };
} | null;

export { FindUserByEmailResponseModel };
