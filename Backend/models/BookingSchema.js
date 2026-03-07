const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: [true, "Please provide a user name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    bookingStatus: {
      type: String,
      required: true,
      enum: ["pending", "booked", "cancelled"], // optional: enforce valid statuses
      default: "pending",
    },
  },
  {
    timestamps: true,
    strict: false, // optional: allow extra fields
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;