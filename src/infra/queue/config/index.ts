import { QueueOptions } from "bull";

import { redis } from "../database";

const config: QueueOptions = {
  redis,
  defaultJobOptions: {
    attempts: 5,
  },
};

export { config };
