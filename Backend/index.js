const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect.js");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8001;

app.use(express.json());

// ✅ Simple CORS
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on ${PORT}`);
});