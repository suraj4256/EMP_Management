const CoAdmin = require("../models/CoAdminSchema");
const bcrypt = require("bcryptjs");


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

  const getCompany = async (req,res) => {
    let success = false;
    const {companyId} = req.params;
    try {
        const company = await CoAdmin.findById(companyId);

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
  }

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
  const { companyId } = req.params;
  const { companyName, email, password, contactNumber, logo } = req.body;

  const existing_company = await CoAdmin.findById( companyId );
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
      companyId,
      {
        $set: updateFields,
      },
      { new: true }
    );

    // Check if something was updated
    if (updatedCompany.nModified > 0) {
      success = true;
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

module.exports = { addCompany, updateCompany, deleteCompany, getAllCompanies, getCompany };
