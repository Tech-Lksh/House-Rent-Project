const User = require("../models/UserSchema");
const Property = require("../models/PropertySchema");
const Booking = require("../models/BookingSchema");

// ---------------- Get All Users ----------------
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No users present",
      });
    }

    return res.status(200).send({
      success: true,
      message: "All users",
      data: allUsers,
    });
  } catch (error) {
    console.error("Error in getAllUsersController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ---------------- Handle Owner Status ----------------
const handleStatusController = async (req, res) => {
  const { userid, status } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userid,
      { granted: status },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: `User has been ${status}`,
      data: user,
    });
  } catch (error) {
    console.error("Error in handleStatusController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ---------------- Get All Properties ----------------
const getAllPropertiesController = async (req, res) => {
  try {
    const allProperties = await Property.find({});
    if (!allProperties || allProperties.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No properties present",
      });
    }

    return res.status(200).send({
      success: true,
      message: "All properties",
      data: allProperties,
    });
  } catch (error) {
    console.error("Error in getAllPropertiesController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ---------------- Get All Bookings ----------------
const getAllBookingsController = async (req, res) => {
  try {
    const allBookings = await Booking.find({});
    return res.status(200).send({
      success: true,
      data: allBookings,
    });
  } catch (error) {
    console.error("Error in getAllBookingsController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsersController,
  handleStatusController,
  getAllPropertiesController,
  getAllBookingsController,
};
