const jwt = require("jsonwebtoken");
const Admin = require("../models/SuperAdminModel");
const Company = require("../models/CoAdminSchema");
const User = require("../models/EmployeeSchema");
const secret = "suraj123";

const fetchUser = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "No token provided, authorization denied",
    });
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const { id, role } = decoded;
    console.log(id, role);
    let user = null;

    // Fetch user based on role
    if (role === "Admin") {
      user = await Admin.findById(id);
    } else if (role === "Company") {
      user = await Company.findById(id);
    } else if (role === "Employee" || role === "Manager") {
      user = await User.findById(id);
    }
    console.log("Queried user:", user); 

    if (!user) {
      return res.status(401).json({
        message: "User not found, authorization denied",
      });
    }

    // Attach user and role to req
    req.user = user;
    // req.userRole = role;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      message: "Invalid or expired token, authorization denied",
    });
  }
};

module.exports = fetchUser;
