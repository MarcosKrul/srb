import { v4 as uuidv4 } from "uuid";

import { IUniqueIdentifierProvider } from "@providers/uniqueIdentifier/models/IUniqueIdentifierProvider";

class UniqueIdentifierProvider implements IUniqueIdentifierProvider {
  generate(): string {
    return uuidv4();
  }
}

export { UniqueIdentifierProvider };
