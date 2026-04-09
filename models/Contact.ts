import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
  type: String,
  required: [true, "Email is required"],
  unique: true, // Fixed: removed the array syntax
},
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  {
    collection: "contacts",
    timestamps: true,
  }
);

// Fix model export
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
