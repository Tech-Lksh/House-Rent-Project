const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      set: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensure no duplicate emails
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    type: {
      type: String,
      required: [true, "User type is required"],
      enum: ["Admin", "Owner", "User"], // Optional: enforce valid user types
    },
    granted: {
      type: String,
      default: null, // Used for Owners (ungranted/pending/granted)
    },
  },
  {
    timestamps: true,
    strict: false, // Optional: allow extra fields
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;