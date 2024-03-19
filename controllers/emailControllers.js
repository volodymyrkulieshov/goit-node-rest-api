import { UsersModel } from "../models/usersModel.js";
import sendEmail from "../helpers/sendEmail.js";

export const verifyEmail = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await UsersModel.findOne({ verifyToken });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await UsersModel.findByIdAndUpdate(user._id, {
    verify: true,
    verifyToken: null,
  });
  res.json({
    message: "Verification successful",
  });
};

export const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await UsersModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verifyEmail = {
    to: email,
    subject: "Digital PhoneBook. Verify your email",
    html: `To confirm you registration please click on the <a target="_blank" href="http://localhost:3000/api/users/verify/${user.verifyToken}">Verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};
