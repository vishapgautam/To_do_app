const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid');


const taskSchema=mongoose.Schema(
    {
      _id:{
          type:String,
          default:()=>uuidv4().replace(/\-/g,"")
      },
      userId:{
          type:String,
          required:true
      },
      taskName:{
          type:String,
          required:[true,'Task name is required'],
          Unique:[true,'already exist']
        },
     description:{
         type:String
     },
     createdAt:{
         type:Date,
         default: new Date()
     },
     dueDate:{
         type:Date
     }
})




module.exports=mongoose.model("Task",taskSchema)