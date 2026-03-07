const User = require("../models/UserSchema");
const Property = require("../models/PropertySchema");
const Booking = require("../models/BookingSchema");

// ---------------- Add Property by Owner ----------------
const addPropertyController = async (req, res) => {
  try {
    let images = [];
    if (req.files) {
      images = req.files.map((file) => ({
        filename: file.filename,
        path: `/uploads/${file.filename}`,
      }));
    }

    const user = await User.findById(req.userId); // ✅ get from middleware
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const newProperty = new Property({
      ...req.body,
      propertyImage: images,
      ownerId: user._id,
      ownerName: user.name,
      isAvailable: "Available",
    });

    await newProperty.save();

    return res.status(200).send({
      success: true,
      message: "New property has been stored",
      data: newProperty,
    });
  } catch (error) {
    console.error("Error in addPropertyController:", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// ---------------- Get All Properties of Owner ----------------
// ---------------- Get All Properties of Owner ----------------
const getAllOwnerPropertiesController = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.userId });
    return res.status(200).send({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error("Error in getAllOwnerPropertiesController:", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// ---------------- Delete Property ----------------
const deletePropertyController = async (req, res) => {
  const propertyId = req.params.propertyid;
  try {
    const deleted = await Property.findByIdAndDelete(propertyId);
    if (!deleted) {
      return res.status(404).send({ success: false, message: "Property not found" });
    }

    return res.status(200).send({
      success: true,
      message: "The property has been deleted",
    });
  } catch (error) {
    console.error("Error in deletePropertyController:", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// ---------------- Update Property ----------------
const updatePropertyController = async (req, res) => {
  try {
    const { propertyid } = req.params;

    let updateData = { ...req.body };

    // Handle image update
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        filename: file.filename,
        path: `/uploads/${file.filename}`,
      }));

      updateData.propertyImage = images;
    }

    const updatedProperty = await Property.findOneAndUpdate(
      { _id: propertyid, ownerId: req.userId }, // security
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).send({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });

  } catch (error) {
    console.error("Update Property Error:", error);

    res.status(500).send({
      success: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
};

// ---------------- Get All Bookings for Owner ----------------
const getAllBookingsController = async (req, res) => {
  try {
    const bookings = await Booking.find({ ownerID: req.userId });
    return res.status(200).send({ success: true, data: bookings });
  } catch (error) {
    console.error("Error in getAllBookingsController:", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// ---------------- Handle Booking Status ----------------
const handleAllBookingstatusController = async (req, res) => {
  const { bookingId, propertyId, status } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { bookingStatus: status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).send({ success: false, message: "Booking not found" });
    }

    const property = await Property.findByIdAndUpdate(
      propertyId,
      { isAvailable: status === "booked" ? "Unavailable" : "Available" },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: `Changed the status of property to ${status}`,
      data: { booking, property },
    });
  } catch (error) {
    console.error("Error in handleAllBookingstatusController:", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addPropertyController,
  getAllOwnerPropertiesController,
  deletePropertyController,
  updatePropertyController,
  getAllBookingsController,
  handleAllBookingstatusController,
};