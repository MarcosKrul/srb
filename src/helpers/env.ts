type keys = "PORT" | "PASSWD_HASH_SALT";

const env = (key: keys): string | undefined => {
  if (!key) return undefined;
  return process.env[key];
};

export { env };
