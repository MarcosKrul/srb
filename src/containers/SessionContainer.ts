import { container } from "tsyringe";

import { SessionRepository, ISessionRepository } from "@repositories/session";

container.registerSingleton<ISessionRepository>(
  "SessionRepository",
  SessionRepository
);
