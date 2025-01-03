const Employee = require("../models/EmployeeSchema");
const CoAdmin = require("../models/CoAdminSchema");
const Task = require("../models/TaskSchema");
const bcrypt = require("bcryptjs");

// Roles :-
// 0. get Employee --get specific employee details
// 1. get All Employee List
// 2. Add Employee --- Image filled not added (Pending) -- Email notifiaction
// 3. Update Employee --- Image filled not added (Pending) -- Email notification -- Device Notification When Logged in
// 4. Delete Employee
// 5. Create Task -- Mail to Employee i.e assignedTo and Manager i.e assignedBy
// 6. Update Task -- Mail to Employee i.e assignedTo and Manager i.e assignedBy
// 7. Delete Task -- Mail to Employee i.e assignedTo and Manager i.e assignedBy
// 8. getTask -- Get specific task data
// 9. get all Tasks --


// get specific Employee details
const getEmployee=async(req,res)=>{
  let success = false;
  try {
  const {id} = req.params; //Employee id
  const existing_Employee =await Employee.findById(id);
  if(!existing_Employee){
    return res.status(400).json({
      data:success,
      message:"Employee is not registered"
    })
  }
  success = true;
  return res.status(200).json({
    data:success,
    existing_Employee,
    message:"Employee data fetched successfully"
  })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data:success,
      message:"Internal Server Error"
    })
  }
  
}

// get All employee details
const getAllEmployee=async(req,res)=>{
  let success = false;
  try {
    const {id} = req.params; //Company id
    const existing_Employees = await Employee.find({ companyId: id });
  if(!existing_Employees){
    return res.status(400).json({
      data:success,
      message:"Employee is not registered"
    })
  }
  success = true;
  return res.status(200).json({
    data:success,
    existing_Employees,
    message:"Employee data fetched successfully"
  })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data:success,
      message:"Internal Server Error"
    })
  }
  
}



// Creation of Employee
const addEmployee = async (req, res) => {
  let success = false;
  try {
    const { id } = req.params;
    const { name, email, password, title, userRole } = req.body;
    const existing_employee = await Employee.findOne({ email });

    if (existing_employee) {
      return res.status(400).json({
        data: success,
        message: "Employee already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   console.log(hashedPassword)
    const newEmployee = await Employee.create({
      name: name,
      email: email,
      password: hashedPassword,
      title: title,
      UserRole: userRole,
      companyId: id,
    });
    console.log(newEmployee)
    success = true;

    return res.status(200).json({
      data: success,
      message: "Employee added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Updation of employee information
const updateEmployee = async (req, res) => {
  let success = false;
  const { id } = req.params;
  const { name, email, password, title, userRole } = req.body;
  const  existing_Employee  = Employee.findById(id);

  if (!existing_Employee) {
    return res.status(400).json({
      data: success,
      message: "Employee doesn't exists",
    });
  }

  const updateFields = {};

  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (password) updateFields.password = password;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updateFields.password = hashedPassword;
  }
  if(title) updateFields.title = title;
  if(userRole) updateFields.UserRole = userRole;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    // Check if the updated Employee is the same as the previous one
    const isUpdated = Object.keys(updateFields).some(
      (field) => updatedEmployee[field] !== existing_Employee[field]
    );

    if (isUpdated) {
      success = true;
      return res.status(200).json({
        data: success,
        message: "Employee updated successfully",
      });
    } else {
      return res.status(400).json({
        data: success,
        message: "No changes made to the Employee details",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: success,
      message: "Error updating Employee details",
    });
  }
};

// Deletion of Employee
const deleteEmployee = async (req, res) => {
  const success = false;
  try {
    const { id } = req.params;
    const existing_Employee = await Employee.findById(id);
    if (!existing_Employee) {
      return res.status(400).json({
        data: success,
        message: "Employee deleted successfully",
      });
    }
    const deletedEmployee = await CoAdmin.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Company not found",
      });
    }
    success = true;
    return res.status(200).json({
      message: "Company deleted successfully",
      data: success,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: success,
      message: "Error updating company",
    });
  }
};

// Task creation
const createTask = async (req, res) => {
  let success = false;
  try {
    const { id } = req.params;
    const { title, description, deadline, assignedTo, assignedBy } = req.body;
    const existing_company = await CoAdmin.findById(id);
    if (!existing_company) {
      return res.status(400).json({
        data: success,
        message: "Company doesn't exists",
      });
    }
    await Task.create({
      title: title,
      description: description,
      deadline: deadline,
      assignedTo: assignedTo,
      assignedBy: assignedBy,
      companyId: id
    });
    success = true;

    //  Nodemailer function will come here  -->

    res.status(200).json({
      data: success,
      message: "Task Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      data: success,
      message: "Internal Server Error",
    });
  }
};

// Updation of task
const updateTask = async (req, res) => {
  let success = false;
  const {id} = req.params;
  const { title, description, deadline, status, assignedTo, assignedBy } = req.body;
  const existing_Task = await Task.findById(id);
  if (!existing_Task) {
    return res.status(400).json({
      data: success,
      message: "Task doesn't exist",
    });
  }
  const updateFields = {};

  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (deadline) updateFields.deadline = deadline;
  if (status) updateFields.status = status;
  if (assignedTo) updateFields.assignedTo = assignedTo; //Mail
  if (assignedBy) updateFields.assignedBy = assignedBy; //Mail

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    // Check if the updated Employee is the same as the previous one
    const isUpdated = Object.keys(updateFields).some(
      (field) => updatedTask[field] !== existing_Task[field]
    );

    if (isUpdated) {
      success = true;

      //  Mail function will come here

      return res.status(200).json({
        data: success,
        message: "Task updated successfully",
      });
    } else {
      return res.status(400).json({
        data: success,
        message: "No changes made to the Task details",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      data: success,
      message: "Internal Server Error",
    });
  }
};

// deletion of task
const deleteTask = async (req, res) => {
  let success = false;
  try {
    const { id } = req.params;
    const existing_Task = await Task.findById(id);
    if (!existing_Task) {
      return res.status(400).json({
        data: success,
        message: "Task doesn't exist",
      });
    }
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(400).json({
        data: success,
        message: "Task deletion incomplete",
      });
    }
    success = true;
    return res.status(200).json({
      data: success,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: success,
      message: "Internal Server Error",
    });
  }
};

const getTask = async (req, res) => {
  let success = false;
  try {
    const { id } = req.params;
    const existing_Task = await Task.findById(id);
    if (!existing_Task) {
      return res.status(400).json({
        data: success,
        message: "Task doesn't exist",
      });
    }
    success = true;
    return res.status(200).json({
      data: success,
      existing_Task,
      message: "Task fetched successfully",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      data:success,
      message:"Internal Server Error"
    })
  }
};

const getAllTasks = async(req,res)=>{
  let success = false;
  try {
    const {id} = req.params;
    const existing_Tasks = await Task.find({companyId:id});
    if(!existing_Tasks){
      return res.status(400).json({
        data:success,
        message:"Tasks not found"
      })
    }
    success = true;
    return res.status(200).json({
      data:success,
      existing_Tasks,
      message:"All Tasks fetched successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data:success,
      message:"Internal Server Error"
    })
  }
}

module.exports = {
  getEmployee,
  getAllEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getAllTasks
};
