type keys =
  | "PORT"
  | "PASSWD_HASH_SALT"
  | "PASSWD_LENGTH"
  | "GROUP_NAME_EMPLOYEE"
  | "JWT_SECRET_KEY"
  | "PAGE_SIZE_DEFAULT"
  | "MAX_LOGIN_ATTEMPTS"
  | "DEFAULT_AVATAR_URL"
  | "BASE_URL";

const env = (key: keys): string | undefined => {
  if (!key) return undefined;
  return process.env[key];
};

export { env };
