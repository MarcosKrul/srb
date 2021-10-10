import { container } from "tsyringe";

import {
  AuthenticationProvider,
  IAuthenticationProvider,
} from "@providers/authentication";
import { HashProvider, IHashProvider } from "@providers/hash";
import { SessionRepository, ISessionRepository } from "@repositories/session";

container.registerSingleton<ISessionRepository>(
  "SessionRepository",
  SessionRepository
);

container.registerSingleton<IAuthenticationProvider>(
  "AuthenticationProvider",
  AuthenticationProvider
);

container.registerSingleton<IHashProvider>("HashProvider", HashProvider);
