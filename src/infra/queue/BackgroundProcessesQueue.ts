import Queue from "bull";

import * as jobs from "@jobs/index";

import { config } from "./config";
import { IAddFunction } from "./models/IAddFunction";
import { IBackgroundProcessQueue } from "./models/IBackgroundProcessQueue";
import { IJob } from "./models/IJob";
import { IProcessFunction } from "./models/IProcessFunction";
import { IQueue } from "./models/IQueue";

const queues: IQueue[] = Object.values(jobs).map((job: IJob) => ({
  job,
  bull: new Queue(job.key, config),
}));

const add: IAddFunction = async (key, data) => {
  const queue = queues.find(({ job }: IQueue) => job.key === key);
  return queue?.bull.add(data, queue.job.options);
};

const process: IProcessFunction = () => {
  return queues.forEach((queue: IQueue) => {
    queue.bull.process(queue.job.handle);

    queue.bull.on("completed", (_, result) => {
      console.log("Job completed", queue.job.key, result);
    });

    queue.bull.on("failed", (job, err) => {
      console.log("Job failed", queue.job.key, job.data);
      console.log(err);
    });
  });
};

const backgroundProcessesQueue: IBackgroundProcessQueue = {
  queues,
  add,
  process,
};

export { backgroundProcessesQueue };
