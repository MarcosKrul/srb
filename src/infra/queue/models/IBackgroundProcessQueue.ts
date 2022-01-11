import { IAddFunction } from "./IAddFunction";
import { IProcessFunction } from "./IProcessFunction";
import { IQueue } from "./IQueue";

interface IBackgroundProcessQueue<T = any> {
  queues: IQueue[];
  process: IProcessFunction;
  add: IAddFunction<T>;
}

export { IBackgroundProcessQueue };
