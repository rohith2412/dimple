import { model, models, Schema } from "mongoose";

const contactSchema = new Schema(
  {
    user: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = models.Contact || model("Contact", contactSchema);
export default Contact;
