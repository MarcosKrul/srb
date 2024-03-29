import express, { Router } from "express";
import multer from "multer";
import path from "path";

import { RoutesPath } from "@common/RoutesPath";
import { i18n } from "@config/i18n";
import { getMulterConfig } from "@config/multer";
import { UserController } from "@controllers/UserController";
import { ensureSameUserIdMiddleware } from "@middlewares/ensureSameUserIdMiddleware";
import { ensureUserAuthenticatedMiddleware } from "@middlewares/ensureUserAuthenticatedMiddleware";

const routes = Router();
const userController = new UserController();

routes.use(
  RoutesPath.AVATAR_FILES,
  ensureUserAuthenticatedMiddleware,
  express.static(
    path.resolve(__dirname, "..", "..", "tmp", "uploads", "avatar")
  )
);

routes.get(
  RoutesPath.READING,
  ensureUserAuthenticatedMiddleware,
  userController.read
);

routes.post(RoutesPath.CREATION, userController.create);

routes.post(
  RoutesPath.UPDATE_PROFILE,
  ensureUserAuthenticatedMiddleware,
  ensureSameUserIdMiddleware(i18n.__("ErrorUpdateAnotherUserProfile")),
  multer(
    getMulterConfig({
      folder: "avatar",
      allowedMimes: ["image/jpeg", "image/pjpeg", "image/png"],
      maxSize: 5 * 1024 * 1024,
    })
  ).single("file"),
  userController.updateProfile
);

export { routes };
