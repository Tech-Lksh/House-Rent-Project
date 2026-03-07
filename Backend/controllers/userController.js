const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema"); // Corrected capitalization
const Property = require("../models/PropertySchema");
const Booking = require("../models/BookingSchema");

// ---------------- Register Controller ----------------
const registerController = async (req, res) => {
  try {
    const existsUser = await User.findOne({ email: req.body.email });
    if (existsUser) {
      return res.status(200).send({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const granted = req.body.type === "Owner" ? "ungranted" : undefined;
    const newUser = new User({ ...req.body, ...(granted && { granted }) });
    await newUser.save();

    return res.status(201).send({ message: "Register Success", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ---------------- Login Controller ----------------
const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(401).send({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "7d" });
    user.password = undefined;

    // send cookie for frontend to use
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).send({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ success: false, message: "Login failed", error: error.message });
  }
};

// ---------------- Forgot Password Controller ----------------
const forgotPasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
    if (!updatedUser) return res.status(200).send({ message: "User not found", success: false });

    return res.status(200).send({ message: "Password changed successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ---------------- Auth Controller ----------------

const authController = async (req, res) => {
  try {
    // Use req.userId from middleware instead of req.body.userId
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).send({ message: "User not found", success: false });

    user.password = undefined; // hide password before sending
    return res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).send({ success: false, message: "Auth error" });
  }
};

// ---------------- Get All Properties ----------------
const getAllPropertiesController = async (req, res) => {
  try {
    const allProperties = await Property.find({});
    if (!allProperties || allProperties.length === 0) throw new Error("No properties available");

    return res.status(200).send({ success: true, data: allProperties });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ---------------- Booking Controller ----------------
const bookingHandleController = async (req, res) => {
  const { propertyid } = req.params;
  const { userDetails, status, ownerId } = req.body;

  try {
    // Use req.userId from authMiddleware
    const booking = new Booking({
      propertyId: propertyid,
      userID: req.userId,   // authenticated user
      ownerID: ownerId,
      userName: userDetails.fullName,
      phone: userDetails.phone,
      bookingStatus: status,
    });

    await booking.save();
    return res.status(200).send({ success: true, message: "Booking status updated" });
  } catch (error) {
    console.error("Error handling booking:", error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ---------------- Get All Bookings for a Tenant ----------------
// ---------------- Get All Bookings for a Tenant ----------------
const getAllBookingsController = async (req, res) => {
  try {
    // Use userId from authMiddleware
    const allBookings = await Booking.find({ userID: req.userId });

    return res.status(200).send({ success: true, data: allBookings });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  authController,
  getAllPropertiesController,
  bookingHandleController,
  getAllBookingsController,
};