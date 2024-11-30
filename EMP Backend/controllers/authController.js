const SuperAdmin = require("../models/SuperAdminModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = "suraj123"

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

// SuperAdmin login
const LoginSuperAdmin = async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  const existing_admin = await SuperAdmin.findOne({ email });
  if (!existing_admin) {
    return res.status(400).json({
      message: "Admin not registered",
    });
  }
  const passwordCompare = await bcrypt.compare(
    password,
    existing_admin.password
  );
  if (!passwordCompare) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }
  success = true;
  const data = {
    admin:{
        id:existing_admin.id
    }
  }
  const token = jwt.sign(data,secret);
  res.status(200).json({
    data:success,
    token:token,
    userRole:existing_admin.UserRole
  })
};

module.exports = {
  RegisterSuperAdmin,
  LoginSuperAdmin
};
