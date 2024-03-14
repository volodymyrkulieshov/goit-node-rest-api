import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UsersModel } from "../models/usersModel.js";
import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

dotenv.config();

const { SECRET_KEY } = process.env;

// const avatarDir = getDir("../public/avatars");

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const registeredEmail = await UsersModel.findOne({ email });
    if (registeredEmail) {
      throw HttpError(409, "Email in use");
    }

    const avatarURL = gravatar.url(email);

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await UsersModel.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
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
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await UsersModel.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await UsersModel.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { _id, email } = req.user;
    await UsersModel.findByIdAndUpdate(_id, { subscription });
    res.json({ user: { email, subscription: subscription } });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    if (!req.file) {
      return res.status(400).send({ message: "File not uploaded" });
    }
    const { path: tempUpload, originalname } = req.file;

    const filename = `${_id}_${originalname}`;

    const resultUpload = path.join("public", "avatars", filename);

    const img = await Jimp.read(tempUpload);
    img.resize(250, 250).write(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await UsersModel.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
