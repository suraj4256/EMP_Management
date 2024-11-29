const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique across the collection
      match: [/.+@.+\..+/, "Invalid email format"], // Regex to validate email
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensures passwords meet a minimum length
    },
    title: {
      type: String,
      required: true,
      trim: true, // Job title, e.g., Singer, Guitarist
    },
    role: {
      type: String,
      enum: ["Manager", "Employee"], // Restricts values to Manager or Employee
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "CoAdmin", // Reference to the company model
      required: true,
    },
  },
  { timestamps: true }
); // Automatically adds `createdAt` and `updatedAt` fields

const User = mongoose.model("User", UserSchema);
module.exports = User;
