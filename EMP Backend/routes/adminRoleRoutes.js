const express = require('express');
const router = express.Router();
const { addCompany, updateCompany,deleteCompany,getAllCompanies,getCompany } = require('../controllers/superAdminRoleController')
const fetchAdmin = require('../middlewares/fetchUser');
const fetchUser = require('../middlewares/fetchUser');

router.post('/addCompany',fetchUser,addCompany)
router.put('/updateCompany/:id',fetchUser,updateCompany)
router.delete('/deleteCompany/:id',fetchUser,deleteCompany)
router.get('/getCompany/:id',fetchUser,getCompany)
router.get('/getAllCompanies',fetchUser,getAllCompanies)

module.exports = router