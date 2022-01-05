import { randomBytes } from "crypto";
import { Request } from "express";
import { diskStorage } from "multer";

import { CustomString } from "@helpers/CustomString";

import { StorageTypes } from "../models/StorageTypesModel";

const storageTypes: StorageTypes = {
  local: (filePath: string) =>
    diskStorage({
      filename: (
        _: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void
      ): void => {
        const fileName = new CustomString(
          `${randomBytes(16).toString("hex")}@srb@${file.originalname
            .toLowerCase()
            .trim()}`
        );

        callback(null, fileName.replaceAll(" ", "-").normalize().toISO);
      },
      destination: (
        _: Request,
        __: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
      ): void => callback(null, filePath),
    }),
};

export { storageTypes };
