import express from "express";
import {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  uploadAvatar,
} from "../controllers/usersControllers.js";
import {
  verifyEmail,
  resendVerifyEmail,
} from "../controllers/emailControllers.js";

import validateBody from "../helpers/validateBody.js";
import { authenticate } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import {
  registerSchema,
  loginSchema,
  updateSubscriptionUserSchema,
  emailVerificationSchema,
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
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  uploadAvatar
);

usersRouter.get("/verify/:verifyToken", verifyEmail);

usersRouter.post(
  "/verify",
  validateBody(emailVerificationSchema),
  resendVerifyEmail
);

export default usersRouter;
