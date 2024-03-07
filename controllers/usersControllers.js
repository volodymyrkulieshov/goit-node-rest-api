import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UsersModel } from "../models/usersModel.js";
import HttpError from "../helpers/HttpError.js";

dotenv.config();

const { SECRET_KEY } = process.env;

export const register = async (req, res) => {
  const { email, password } = req.body;
  const registeredEmail = await UsersModel.findOne({ email });
  if (registeredEmail) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await UsersModel.create({
    ...req.body,
    password: hashPassword,
  });
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await UsersModel.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

export const logout = async (req, res) => {
  const { _id } = req.user;
  await UsersModel.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

export const getCurrent = async (req, res, next) => {
  try {
    const { subscription, email } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id, email } = req.user;
  await UsersModel.findByIdAndUpdate(_id, { subscription });
  res.json({ user: { email, subscription: subscription } });
};

export default {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
};
