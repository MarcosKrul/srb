import { JobOptions, ProcessCallbackFunction } from "bull";

interface IJob<T = any> {
  key: string;
  handle: ProcessCallbackFunction<T>;
  options?: JobOptions;
}

export { IJob };
