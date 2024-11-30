const express = require('express');
const router = express.Router();
const { addCompany, updateCompany,deleteCompany,getAllCompanies,getCompany } = require('../controllers/superAdminRoleController')
const fetchAdmin = require('../middlewares/fetchSuperAdmin')

router.post('/addCompany',fetchAdmin,addCompany)
router.put('/updateCompany/:id',fetchAdmin,updateCompany)
router.delete('/deleteCompany/:id',fetchAdmin,deleteCompany)
router.get('/getCompany/:id',fetchAdmin,getCompany)
router.get('/getAllCompanies',fetchAdmin,getAllCompanies)

module.exports = router