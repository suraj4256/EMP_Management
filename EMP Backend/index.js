const express = require('express');
require('./db')
const authRouter = require('./routes/authRoutes')
const adminRoleRouter = require('./routes/adminRoleRoutes')
const companyRole = require('./routes/companyRoutes')
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Auth common route
app.use('/api/auth',authRouter)

//  Super Admin Roles
app.use('/api/adminrole',adminRoleRouter)

// Company Roles
app.use('/api/companyrole',companyRole)

app.listen(port,()=>{
    console.log("Listening to Port ",port)
})