const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid');

const userSchema=mongoose.Schema(
    {
      _id:{
          type:String,
          default:()=>uuidv4().replace(/\-/g,"")
      },
      firstName:{
          type:String,
          required:[true,'First name is required']
        },
      lastName:{
          type:String,
          required:[true,'last name is required']
          },
     emailId:{
         type:String,
         required:[true,'Eamil Id is required'],
         unique:true
     },
     password:{
         type:String,
         required:true
     },
     tasks:{
         type:Array
     }
})

module.exports=mongoose.model("User",userSchema)