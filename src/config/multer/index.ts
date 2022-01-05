import { Request } from "express";
import { Options } from "multer";
import { resolve as pathResolve } from "path";

import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";

import { GetMulterConfigModel } from "./models/GetMulterConfigModel";
import { storageTypes } from "./storageTypes";

const getMulterConfig = ({
  folder,
  allowedMimes,
  maxSize,
}: GetMulterConfigModel): Options => {
  const filePath = pathResolve(
    __dirname,
    "..",
    "..",
    "..",
    "tmp",
    "uploads",
    folder
  );

  return {
    dest: filePath,
    limits: { fileSize: maxSize },
    storage: storageTypes.local(filePath),
    fileFilter: (_: Request, file: Express.Multer.File, callback) => {
      if (allowedMimes.includes(file.mimetype)) callback(null, true);
      else
        callback(
          new AppError(400, i18n.__("ErrorUploadFileUnsupportedMimetype"))
        );
    },
  };
};

export { getMulterConfig };
