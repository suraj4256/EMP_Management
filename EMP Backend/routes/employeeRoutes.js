const express = require('express');
const { createTask,updateTask, deleteTask, getTask, getAllTasks } = require('../controllers/employeeRoleController');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();

router.post('/createTask',fetchUser,createTask);
router.put('/updateTask',fetchUser,updateTask);
router.delete('/deleteTask',fetchUser,deleteTask);
router.get('/getTask',fetchUser,getTask);
router.get('/getAllTasks',fetchUser,getAllTasks);

module.exports = router;

