const {mongoose,Schema} = require('mongoose');

const SuperAdminSchema = new Schema({
  
    UserRole:{
     type:String,
     default:"SuperAdmin",
     required:true
    },
    email:{
        type:String,
        unique:true,
        required:true    
    },
    password:{
        type:String,
        required:true
    }
})
const SuperAdmin = mongoose.model("SuperAdmin", SuperAdminSchema);
module.exports = SuperAdmin;