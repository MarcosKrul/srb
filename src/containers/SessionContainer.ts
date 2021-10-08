import { container } from "tsyringe";

import {
  AuthenticationProvider,
  IAuthenticationProvider,
} from "@providers/authentication";
import { SessionRepository, ISessionRepository } from "@repositories/session";

container.registerSingleton<ISessionRepository>(
  "SessionRepository",
  SessionRepository
);

container.registerSingleton<IAuthenticationProvider>(
  "AuthenticationProvider",
  AuthenticationProvider
);
