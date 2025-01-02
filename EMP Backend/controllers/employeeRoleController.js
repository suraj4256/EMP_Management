const express = require('express');
const Task = require('../models/TaskSchema');
const Employee = require('../models/EmployeeSchema');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "surajdey2k1@gmail.com",
    pass: "nbjsfntwiabwjdxb",
  },
});

const sendTaskCreatedMail=async(managerId,EmployeeId,companyEmail)=>{

  try {
    const existingManager = await Employee.findById(managerId);
    const existingEmployee = await Employee.findById(EmployeeId);

    if (!existingManager || !existingEmployee) {
      throw new Error("Manager or Employee not found");
    }

    const managerEmail = existingManager.email;
    const employeeEmail = existingEmployee.email;
  
    const mailOptions = {
      from: "surajdey2k1@gmail.com",
      to: employeeEmail,managerEmail,companyEmail,
      subject: "Task Created",
      text: `Task Created by ${existingManager.email}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent: " + info.response);
      }
    });

  } catch (error) {
    console.log(error.message);
  }
}

async function sendTaskUpdatedMail(title, ){

}

// Task creation by Manager
const createTask = async (req, res) => {
    let success = false;
    try {
      const { id } = req.params; //Manager id
      const { title, description, deadline, assignedTo, companyId } = req.body;
      const existing_company = await Task.find({companyId:companyId});
      if (!existing_company) {
        return res.status(400).json({
          data: success,
          message: "Manager doesn't exists",
        });
      }
      await Task.create({
        title: title,
        description: description,
        deadline: deadline,
        assignedTo: assignedTo,
        assignedBy: id,
        companyId: companyId
      });
      success = true;
  
      //  Nodemailer function to provide mail  -->
      try {
       await sendTaskCreatedMail(id, assignedTo, existing_company.email);
      } catch (error) {
        console.error("Failed to send email:", error.message);
        return res.status(500).json({
          message: "Task created, but failed to send email notification.",
        });
      }

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
  
  // Updation of task by Manager
  const updateTask = async (req, res) => {
    let success = false;
    const {id} = req.params; //Task id
    const { title, description, deadline, status, assignedTo } = req.body;
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
    if (assignedTo) updateFields.assignedTo = assignedTo; //Mail by nodemailer
  
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
        try {
          await sendTaskUpdatedMail(existing_Task.title, existing_Task.assignedTo, existing_Task.assignedBy, existing_Task.companyId);
         } catch (error) {
           console.error("Failed to send email:", error.message);
           return res.status(500).json({
             message: "Task updated, but failed to send email notification.",
           });
         }

  
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
      const { id } = req.params; //Task id 
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
      const { id } = req.params;   //task id
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
      const {id} = req.params;   //Manager Id
      const existing_Tasks = await Task.find({assignedBy:id});
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
    createTask,
    updateTask,
    deleteTask,
    getTask,
    getAllTasks
  }