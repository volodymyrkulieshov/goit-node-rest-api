import express from "express";
import {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
} from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { authenticate } from "../middlewares/auth.js";
import {
  registerSchema,
  loginSchema,
  updateSubscriptionUserSchema,
} from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerSchema), register);

usersRouter.post("/login", validateBody(loginSchema), login);

usersRouter.post("/logout", authenticate, logout);

usersRouter.get("/current", authenticate, getCurrent);

usersRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionUserSchema),
  updateSubscription
);

export default usersRouter;

