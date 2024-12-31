const CoAdmin = require("../models/CoAdminSchema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "surajdey2k1@gmail.com",
    pass: "nbjsfntwiabwjdxb",
  },
});

const sendSuccessfullAddMail = (email,password) => {
  const mailOptions = {
    from: "surajdey2k1@gmail.com",
    to: email,
    subject: "Company added Successfully",
    text: `Company added with credentials email:${email} and Password:${password}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};

const sendSuccessfullUpdateMail = (email) => {
  const mailOptions = {
    from: "surajdey2k1@gmail.com",
    to: email,
    subject: "Updation Successfully",
    text: `Company info Updated. Please login to check updates`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};

const sendSuccessfullDeleteMail = (email) => {
  const mailOptions = {
    from: "surajdey2k1@gmail.com",
    to: email,
    subject: "Deletion Successfully",
    text: `Company with email:${email} has been deleted`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};



const getAllCompanies = async (req, res) => {
  let success = false;
  try {
    const companies = await CoAdmin.find();

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        data: success,
        message: "No companies found",
      });
    }

    success = true;
    return res.status(200).json({
      data: success,
      companies,
      message: "Companies fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({
      data: success,
      message: "Error fetching companies",
    });
  }
};

const getCompany = async (req, res) => {
  let success = false;
  const { id } = req.params;
  try {
    const company = await CoAdmin.findById(id);

    if (!company) {
      return res.status(404).json({
        data: success,
        message: "Company not found",
      });
    }

    success = true;
    return res.status(200).json({
      data: success,
      company,
      message: "Company fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    return res.status(500).json({
      data: success,
      message: "Error fetching company",
    });
  }
};

const addCompany = async (req, res) => {
  let success = false;
  try {
    const { companyName, email, password, contactNumber, logo } = req.body;

    const existing_company = await CoAdmin.findOne({ email });
    if (existing_company) {
      return res.status(400).json({
        message: "Company already created with the same email",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await CoAdmin.create({
      companyName: companyName,
      email: email,
      password: hashedPassword,
      contactNumber: contactNumber,
      logo: logo,
    });
    success = true;
    // Nodemailer function to be used here...
    sendSuccessfullAddMail(email,password);
    res.status(200).json({
      data: success,
      message: "Company created successfully",
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

const updateCompany = async (req, res) => {
  let success = false;
  const { id } = req.params;
  const { companyName, email, password, contactNumber, logo } = req.body;

  const existing_company = await CoAdmin.findById(id);
  if (!existing_company) {
    return res.status(400).json({
      data: success,
      message: "Company doesn't exist",
    });
  }

  const updateFields = {};

  if (companyName) updateFields.companyName = companyName;
  if (contactNumber) updateFields.contactNumber = contactNumber;
  if (email) updateFields.email = email;
  if (logo) updateFields.logo = logo;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updateFields.password = hashedPassword;
  }

  try {
    const updatedCompany = await CoAdmin.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    // Check if the updated company is the same as the previous one
    const isUpdated = Object.keys(updateFields).some(
      (field) => updatedCompany[field] !== existing_company[field]
    );

    if (isUpdated) {
      success = true;
      // Nodemailer to be used here...
      sendSuccessfullUpdateMail(email)
      return res.status(200).json({
        data: success,
        message: "Company updated successfully",
      });
    } else {
      return res.status(400).json({
        data: success,
        message: "No changes made to the company",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: success,
      message: "Error updating company",
    });
  }
};

const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCompany = await CoAdmin.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({
        message: "Company not found",
      });
    }
    sendSuccessfullDeleteMail(email)
    res.status(200).json({
      message: "Company deleted successfully",
      data: deletedCompany,
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  addCompany,
  updateCompany,
  deleteCompany,
  getAllCompanies,
  getCompany,
};
