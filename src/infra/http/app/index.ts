import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import "@containers/index";
import { routes } from "src/routes";

import {
  errorHandlerMiddleware,
  internationalizationMiddleware,
} from "@middlewares/index";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(internationalizationMiddleware);
app.use(routes);
app.use(errorHandlerMiddleware);

process.on("SIGTERM", () => {
  process.exit();
});

export { app };
