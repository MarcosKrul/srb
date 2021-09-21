import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import "@containers/index";
import { routes } from "src/routes";

import { errorHandler } from "@middlewares/errorHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(routes);
app.use(express.json());
app.use(errorHandler);

process.on("SIGTERM", () => {
  process.exit();
});

export { app };
