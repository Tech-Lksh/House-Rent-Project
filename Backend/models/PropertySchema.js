const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyType: {
      type: String,
      required: [true, "Please provide a property type"],
    },
    propertyAdType: {
      type: String,
      required: [true, "Please provide a property ad type"],
    },
    propertyAddress: {
      type: String,
      required: [true, "Please provide an address"],
    },
    ownerContact: {
      type: String,
      required: [true, "Please provide owner contact"],
    },
    propertyAmt: {
      type: Number,
      default: 0,
    },
    propertyImage: [
      {
        filename: String,
        path: String,
      },
    ],
    additionalInfo: {
      type: String,
    },
    ownerName: {
      type: String,
    },
    isAvailable: {
      type: String,
      default: "Available",
      enum: ["Available", "Unavailable"],
    },
  },
  {
    timestamps: true,
    strict: false, // optional: allows extra fields
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
