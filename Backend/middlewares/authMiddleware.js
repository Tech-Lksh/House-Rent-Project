const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).send({ message: "No token found in cookies", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id; // attach userId for protected routes
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Invalid or expired token", success: false });
    }

    res.status(500).send({ message: "Internal server error", success: false });
  }
};

module.exports = { authMiddleware };