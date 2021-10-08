type keys =
  | "PORT"
  | "PASSWD_HASH_SALT"
  | "PASSWD_LENGTH"
  | "GROUP_NAME_EMPLOYEE"
  | "MAX_LOGIN_ATTEMPTS";

const env = (key: keys): string | undefined => {
  if (!key) return undefined;
  return process.env[key];
};

export { env };
