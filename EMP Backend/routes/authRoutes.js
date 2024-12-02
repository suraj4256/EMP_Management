const express = require('express');
const router = express.Router();
const {RegisterSuperAdmin,loginUser} = require('../controllers/authController');


router.post('/registerSuperAdmin',RegisterSuperAdmin)
router.post('/login',loginUser)




module.exports = router;
