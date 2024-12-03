const express = require('express');
const Task = require('../models/TaskSchema');

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