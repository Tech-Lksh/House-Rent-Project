const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// ---------------- Trust Proxy (important for Render/Heroku) ----------------
app.set("trust proxy", 1); // 🟢 required for secure cookies behind a proxy

// ---------------- Middleware ----------------
app.use(express.json());
app.use(cookieParser());

// ---------------- CORS Setup ----------------
const allowedOrigins = [
  "http://localhost:5173", // local dev frontend
  "https://house-rent-project-zeta.vercel.app", // your deployed frontend
  "https://house-rent-project-5.onrender.com", // optional: backend domain itself
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // 🟢 allows cookies to be sent cross-origin
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
    process.exit(1);
  });