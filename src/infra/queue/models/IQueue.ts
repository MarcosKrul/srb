import { Queue } from "bull";

import { IJob } from "./IJob";

interface IQueue {
  job: IJob;
  bull: Queue;
}

export { IQueue };
