const express = require('express');
require('./db')
const authRouter = require('./routes/authRoutes')
const adminRoleRouter = require('./routes/adminRoleRoutes')
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Super Admin auth
app.use('/api/auth',authRouter)

//  Super Admin Roles
app.use('/api/role',adminRoleRouter)


app.listen(port,()=>{
    console.log("Listening to Port ",port)
})