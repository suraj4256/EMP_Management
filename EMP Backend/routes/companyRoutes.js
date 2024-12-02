const express = require("express");
const router = express.Router();
const fetchUser= require('../middlewares/fetchUser');

const {
  getEmployee,
  getAllEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getAllTasks,
} = require("../controllers/companyRoleController");

// Employee CRUD routes
router.get("/getEmployee/:id", fetchUser, getEmployee);
router.get("/getAllEmployee/:id", fetchUser, getAllEmployee);
router.post("/addEmployee/:id", fetchUser, addEmployee);
router.put("/updateEmployee/:id", fetchUser, updateEmployee);
router.delete("/deleteEmployee/:id", fetchUser, deleteEmployee);

// Task CRUD Routes
router.get("/getTask/:id", fetchUser, getTask);
router.get("/getAllTasks/:id", fetchUser, getAllTasks);
router.post("/createTask/:id", fetchUser, createTask);
router.put("/updateTask/:id", fetchUser, updateTask);
router.delete("/deleteTask/:id", fetchUser, deleteTask);

module.exports = router;
