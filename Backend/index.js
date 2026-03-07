const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect.js");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8001;

// ⭐ Render / Proxy fix
app.set("trust proxy", 1);

// middleware
app.use(express.json());
app.use(cookieParser());

// ⭐ CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://house-rent-project-zeta.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

// server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});