import { i18n } from "@config/i18n";
import { AppError } from "@error/AppError";
import { IMiddleware } from "@infra/http";

const ensureSameUserIdMiddleware = (
  message: string,
  property = "id"
): IMiddleware => {
  return async (req, __, next) => {
    try {
      const { [`${property}`]: idParam } = req.params;

      if (!idParam || !req.user?.id)
        throw new AppError(400, i18n.__("ErrorGenericToken"));

      if (idParam !== req.user.id) throw new AppError(401, message);

      return next();
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, i18n.__("ErrorGenericToken"));
    }
  };
};

export { ensureSameUserIdMiddleware };
