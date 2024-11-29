const express = require('express');
const router = express.Router();
const {RegisterSuperAdmin,LoginSuperAdmin} = require('../controllers/authController');


router.post('/registerSuperAdmin',RegisterSuperAdmin)
router.post('/loginSuperAdmin',LoginSuperAdmin)

module.exports = router;
