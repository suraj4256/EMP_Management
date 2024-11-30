const express = require('express');
const router = express.Router();
const {RegisterSuperAdmin,LoginSuperAdmin,LoginCompany} = require('../controllers/authController');


router.post('/registerSuperAdmin',RegisterSuperAdmin)
router.post('/loginSuperAdmin',LoginSuperAdmin)
router.post('/loginCompany',LoginCompany)

module.exports = router;
