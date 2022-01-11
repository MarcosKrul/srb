import { IJob } from "@infra/queue/models/IJob";

const job: IJob = {
  handle: ({ data }, done) => {
    console.log(data);
    done(null, { test: "test" });
    // done(new Error("test"), { test: "test" });
  },
  key: "TestJob",
  options: {
    delay: 5000,
  },
};

export { job };
