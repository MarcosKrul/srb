import { env } from "@helpers/env";

const redis = {
  host: env("REDIS_HOST"),
  port: Number(env("REDIS_PORT")),
  username: env("REDIS_USERNAME"),
  password: env("REDIS_PASSWORD"),
};

export { redis };
