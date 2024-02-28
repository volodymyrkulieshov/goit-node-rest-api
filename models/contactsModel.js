import mongoose from "mongoose";
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

const ContactsModel = model("contact", contactSchema);


export {
  ContactsModel,
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};