import mongoose from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";
const contactSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
      }
    
)

contactSchema.post("save", handleMongooseError);

export const ContactsModel = mongoose.model("contact", contactSchema);

