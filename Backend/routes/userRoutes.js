const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  forgotPasswordController,
  getAllPropertiesController,
  authController,
  bookingHandleController,
  getAllBookingsController,
} = require("../controllers/userController");

const router = express.Router();

// ---------------- User Authentication Routes ----------------
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);

// ---------------- Property Routes ----------------
router.get("/get-all-properties", getAllPropertiesController);

// ---------------- Authenticated User Routes ----------------
router.post("/get-user-data", authMiddleware, authController);

// Handle booking for a property
router.post("/booking-handle/:propertyid", authMiddleware, bookingHandleController);

// Get all bookings for the authenticated user
router.get("/get-all-bookings", authMiddleware, getAllBookingsController);

module.exports = router;