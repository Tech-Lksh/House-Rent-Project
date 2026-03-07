const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  handleStatusController,
  getAllPropertiesController,
  getAllBookingsController,
} = require("../controllers/adminController");

const router = express.Router();

// ---------------- Admin Routes ----------------
router.get("/get-all-users", authMiddleware, getAllUsersController);

// Update owner status
router.put("/handle-status", authMiddleware, handleStatusController);

// Get all properties
router.get("/get-all-properties", authMiddleware, getAllPropertiesController);

// Get all bookings
router.get("/get-all-bookings", authMiddleware, getAllBookingsController);

module.exports = router;