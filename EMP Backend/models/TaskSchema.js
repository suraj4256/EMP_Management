const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({

  title:{
    type: String,
    required: true,
    trim: true, // Removes extra whitespaces 
  },   

  description:{
    type: String,
    required: true,
    trim: true,
  },   
  
  deadline:{
    type: Date,
    required: true,
  },   

  status:{
    type: String,
    enum: ['Pending', 'Completed', 'Not Completed'], // Restrict status to these values 
    default: 'Pending',  
  },   

  assignedTo:[{
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model 
    required: true, 
  }],   

  assignedBy:[{
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model 
    required: true,
  }],   

  companyId:{
    type: Schema.Types.ObjectId,
    ref: 'CoAdmin', // Reference to the Company model 
    required: true,
  },

}, { 
    timestamps: true 
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
 
    
        
           
               
                  
                       
                           
                              
                                 
                                     
                                         
                                            
                                                
                                                    