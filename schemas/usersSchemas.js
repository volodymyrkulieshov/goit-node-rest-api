import Joi from "joi";

const subscriptionOptions = ["starter", "pro", "business"];

export const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionOptions),
  avatarUrl: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const updateSubscriptionUserSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .required(),
});

export const emailVerificationSchema = Joi.object({
  email: Joi.string().required(),
});

// export default {
//   registerSchema,
//   loginSchema,
//   updateSubscriptionUserSchema,
// };
