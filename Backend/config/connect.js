const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Optional: avoid deprecation warnings
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = connectDB;