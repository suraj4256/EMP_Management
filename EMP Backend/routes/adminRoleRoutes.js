const express = require('express');
const router = express.Router();
const { addCompany, updateCompany,deleteCompany,getAllCompanies,getCompany } = require('../controllers/superAdminRoleController')
const fetchAdmin = require('../middlewares/fetchSuperAdmin')

router.post('/addCompany',fetchAdmin,addCompany)
router.post('/updateCompany/:id',fetchAdmin,updateCompany)
router.post('/deleteCompany/:id',fetchAdmin,deleteCompany)
router.post('/getCompany',fetchAdmin,getCompany)
router.post('/getAllCompanies',fetchAdmin,getAllCompanies)

module.exports = router