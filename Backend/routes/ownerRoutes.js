const express = require("express");
const multer = require("multer");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addPropertyController,
  getAllOwnerPropertiesController,
  handleAllBookingstatusController,
  deletePropertyController,
  updatePropertyController,
  getAllBookingsController,
} = require("../controllers/ownerController");

const router = express.Router();

// ---------------- Multer setup ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const upload = multer({ storage });

// ---------------- Owner Routes ----------------

// Add a new property
router.post(
  "/post-property",
  upload.array("propertyImages"),
  authMiddleware,
  addPropertyController
);

// Get all properties of owner
router.get("/get-all-properties", authMiddleware, getAllOwnerPropertiesController);

// Get all bookings for owner
router.get("/get-all-bookings", authMiddleware, getAllBookingsController);

// Handle booking status update
router.patch("/handle-booking-status", authMiddleware, handleAllBookingstatusController);

// Delete property
router.delete("/delete-property/:propertyid", authMiddleware, deletePropertyController);

// Update property
router.patch(
  "/update-property/:propertyid",
  upload.single("propertyImage"),
  authMiddleware,
  updatePropertyController
);

module.exports = router;