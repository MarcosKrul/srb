type JwtPayloadModel = {
  id: string;
  avatar?: string;
  name: string;
  roles: string[];
  type: "access_token" | "refresh_token";
};

export { JwtPayloadModel };
