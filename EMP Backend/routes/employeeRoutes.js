const express = require('express');
const { createTask,updateTask, deleteTask, getTask, getAllTasks } = require('../controllers/employeeRoleController');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();

router.post('/createTask/:id',fetchUser,createTask);
router.put('/updateTask/:id',fetchUser,updateTask);
router.delete('/deleteTask/:id',fetchUser,deleteTask);
router.get('/getTask/:id',fetchUser,getTask);
router.get('/getAllTasks/:id',fetchUser,getAllTasks);

module.exports = router;

