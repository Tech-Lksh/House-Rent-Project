const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// ---------------- Trust Proxy (for cookies behind proxy) ----------------
app.set("trust proxy", 1);

// ---------------- Middleware ----------------
app.use(express.json());
app.use(cookieParser());

// ---------------- CORS Setup ----------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://house-rent-project-zeta.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// ---------------- Static Folder ----------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------- Routes ----------------
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/admin", require("./routes/adminRoutes.js"));
app.use("/api/owner", require("./routes/ownerRoutes.js"));

// ---------------- Start Server ----------------
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // exit if DB connection fails
  });