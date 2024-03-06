import mongoose from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError";

const userSchema = new mongoose.Schema(
    {
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
      }
      
)

userSchema.post("save", handleMongooseError);

export const UsersModel = mongoose.model("user", userSchema);