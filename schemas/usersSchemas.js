import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid(...subscriptionOptions),
  });
  
  export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  
//   export const updateSubscriptionUserSchema = Joi.object({
//     subscription: Joi.string()
//       .valid(...subscriptionOptions)
//       .required(),
//   });