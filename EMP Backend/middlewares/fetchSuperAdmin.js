const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/SuperAdminModel'); 
const secret = "suraj123"

const fetchAdmin = async (req, res, next) => {

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      message: "No token provided, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, secret); 
    console.log(decoded)
    const admin = await SuperAdmin.findById(decoded.admin.id); 
    console.log(admin)
    if (!admin) {
      return res.status(401).json({
        message: "Admin not found, authorization denied",
      });
    }
    req.admin = admin;
    next();

  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      message: "Invalid or expired token, authorization denied",
    });
  }
};

module.exports = fetchAdmin;
