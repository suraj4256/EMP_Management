const SuperAdmin = require("../models/SuperAdminModel");
const Company = require("../models/CoAdminSchema");
const User = require("../models/EmployeeSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "suraj123";

// Super Admin registration
const RegisterSuperAdmin = async (req, res) => {
  const { email, password } = req.body;
  const existing_admin = await SuperAdmin.findOne({ email });
  if (existing_admin) {
    return res.status(400).json({
      message: "Admin already exist",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await SuperAdmin.create({
    email: email,
    password: hashedPassword,
  });

  res.json({
    message: "Super admin created successfully with email",
    email,
  });
};

const loginUser = async (req, res) => {
  let success = false;
  const { email, password } = req.body;

  try {
    // Prioritized order of roles and collections
    const roles = [
      { name: "Admin", model: SuperAdmin },
      { name: "Company", model: Company },
      { name: "User", model: User }, // Includes Employees and Managers
    ];

    let foundUser = null;
    let userRole = null;

    // Search for the user in each collection
    for (const role of roles) {
      foundUser = await role.model.findOne({ email });
      if (foundUser) {
        console.log(foundUser)
        userRole = foundUser.UserRole;
        break; // Exit loop once the user is found
      }
    }

    // If user is not found in any collection
    if (!foundUser) {
      return res.status(404).json({
        message: "User not registered",
      });
    }

    // Compare passwords
    const passwordCompare = await bcrypt.compare(password, foundUser.password);
    if (!passwordCompare) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    success = true;
    const payload = {
      id: foundUser.id,
      role: userRole
    };
    console.log(foundUser.id)
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    // Return success response
    res.status(200).json({
      data: success,
      token: token,
      userRole: userRole,
      message: `${userRole} logged in successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: success,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  RegisterSuperAdmin,
  loginUser,
};
