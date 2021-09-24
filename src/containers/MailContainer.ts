import { container } from "tsyringe";

import { MailRepository, IMailRepository } from "@repositories/mail";

container.registerSingleton<IMailRepository>("MailRepository", MailRepository);
