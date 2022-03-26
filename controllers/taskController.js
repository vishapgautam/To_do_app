const User=require('../models/User')
const Task =require('../models/Task')

module.exports.add=async(req,res)=>{
    const userId =req.params.id
    const user=await User.findOne({id:userId})
    if (!user) res.status(400).json({success:"false",description:"user not found"})
    else{
        const task=await Task({
            userId:userId,
            taskName:req.body.taskName,
            description:req.body.description
        })
        task.save(function(error,result){
        if(error) res.status(400).json({success:"false",error:error})
        else{
            user.tasks.push(result._id)
            User.findByIdAndUpdate(user._id,{tasks:user.tasks},function(err,re){
                if (err) res.status(400).json({success:"false",error:error})
                else{
                    res.render('notify',{type:'success',response:'Successfully added',message1:'Go back to your tasks',link:`/${userId}`})
                    // res.status(200).json({success:"true",task:result})
                }
            }) 
        }
        })
    }
}


module.exports.getOne=async(req,res)=>{
    const taskId=req.params.id1
    const task=await Task.findOne({id:taskId})
    if (!task) res.status(400).json({success:"false",description:"no tasks found"})
    else{
        res.status(200).json({success:"true",task:task})
    }
    
}


module.exports.getall=async(req,res)=>{
    const userId=req.params.id1
    let page=req.params.page
    if (!page || page==0) page=1
    const tasks=await Task.find({userId:userId}).select("-__v -userId").sort("createdAt").skip((page-1)*5).limit(5)
    res.status(200).json({success:"true",length:tasks.length,tasks:tasks})
}


module.exports.update=async(req,res)=>{
    const id=req.params.id
    Task.findByIdAndUpdate(id,req.body,function(error,result){
        if (error) res.status(400).json({success:"false",description:"no tasks found"})
        else{
            res.status(200).json({success:"true",description:"Updated successfuly"})
        }
    })
}


module.exports.delete=async(req,res)=>{
    const id=req.params.id
    Task.findByIdAndDelete(id,function(error,result){
        if(error) res.status(400).json({success:"false",error:error})
        else{
            res.render('notify',{type:'success',response:'Successfully Deleted',message1:'Go back to your tasks',link:`/${result.userId}`})
            // res.status(200).json({success:"true",description:"Deleted Successfuly"})
        }
    })
}