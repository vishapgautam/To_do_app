const User=require('../models/User')
module.exports.signup=async(req,res)=>{
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const emailId=req.body.emailId
    const password=req.body.password
    console.log(firstName,lastName,emailId,password)
    if (!firstName || !lastName || !emailId || !password) res.status(400).json({success:"false",error:"Fields are missing"})
    else{
    const user= await User({
        firstName:firstName,
        lastName:lastName,
        emailId:emailId,
        password:password
    })
    user.save(function(err,result){
        if (err) res.status(400).json({success:"false",error:err})
        else{
            res.redirect(`/${result._id}`)
        }
    })
}}

module.exports.login=async(req,res)=>{
    const emailId=req.body.emailId
    const password=req.body.password
    if (!emailId || !password) res.status(400).json({success:"false",error:"Fields are missing"})
    else {
    const user= await User.findOne({emailId:emailId})
    if (!user) res.status(400).json({success:"false",error:"User not found"})
    else{
        if (user.password===password) res.redirect(`/${user._id}`)
        else{
            res.status(400).json({success:"false",error:"Incorrect password"})
        }
}
}}



module.exports.update=async(req,res)=>{
    const id=req.params.id
    const user=await User.findOne({id:id})
    if (!user) res.status(400).json({success:"false",error:"User not found"})
    else{
        User.findByIdAndUpdate(id,req.body,function(err,result){
            if (err) res.status(400).json({success:"false",error:err})
            else{
                res.status(200).json({success:"true",description:"Updated"})
            }
        })
    }
}



module.exports.delete=async(req,res)=>{
    const id=req.params.id
    const user=await User.findOne({id:id})
    if (!user) res.status(400).json({success:"false",error:"User not found"})
    else{
        User.findByIdAndDelete(id,function(error,result){
            if (error) res.status(400).json({success:"false",error:error})
            else{
                res.status(200).json({success:"true",description:"User deleted"})
            }
        })
    }
    res.status(200).json({success:"True"})
}

module.exports.getall=async(req,res)=>{
    const users=await User.find()
    res.status(200).json({success:"true",length:users.length,users:"##"})
}

module.exports.getOne=async(req,res)=>{
    const id=req.params.id
    const user=await User.findOne({id:id})
    if (!user) res.status(400).json({success:"false",error:"User not found"})
    else{
        res.status(200).json({success:"true",user:user})
    }
}