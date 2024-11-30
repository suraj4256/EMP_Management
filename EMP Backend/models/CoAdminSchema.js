const { mongoose, Schema } = require("mongoose");

const CoAdminSchema = new Schema({
  companyId: { 
    type: Schema.Types.ObjectId,
    unique: true,
    default: function () { return this._id; }
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber:{
    type: Number,
    default:''
  },
  logo: {
    default:'',
    type: String,
  },
});

const CoAdmin = mongoose.model("CoAdmin", CoAdminSchema);
module.exports = CoAdmin;

//   "contactNumber": "1234567890",
//   "logo": "logo_url",
//   "address": "123 Main St",
//   "description": "Music-focused company",
//   "admin": {
//     "name": "John Doe",
//     "email": "john.doe@musicworld.com",
//     "password": "hashed_password"
//   }
