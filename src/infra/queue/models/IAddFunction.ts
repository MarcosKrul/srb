import { Job } from "bull";

interface IAddFunction<T = any> {
  (name: string, data: T): Promise<Job<T> | undefined>;
}

export { IAddFunction };
