type JwtPayloadModel = {
  id?: string;
  avatar?: string;
  name?: string;
  email?: string;
  exp?: number;
  iat?: number;
  roles?: string[];
  type: "access_token" | "refresh_token";
};

export { JwtPayloadModel };
