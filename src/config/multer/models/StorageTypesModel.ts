import { StorageEngine } from "multer";

type StorageTypes = {
  local: (filePath: string) => StorageEngine;
  s3?: "not implemented";
  gcloud?: "not implemented";
};

export { StorageTypes };
