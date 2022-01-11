import { Roles } from "@prisma/client";

type GetUserByEmailResponseModel = {
  id: number;
  primary: boolean;
  advertising: boolean;
  notifications: boolean;
  email: string;
  userId: string;
  user: {
    name: string;
    password: string;
    loginControl: {
      attempts: number;
      blocked: boolean;
    } | null;
    userGroup: {
      roles: Roles[];
    };
    profile: {
      avatar: string;
      bio: string;
    } | null;
  };
} | null;

export { GetUserByEmailResponseModel };
