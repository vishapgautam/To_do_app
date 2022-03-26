const Task=require('../models/Task')
const User=require('../models/User')
module.exports.mainpage=(req,res)=>{
    res.render('home')
}

module.exports.signup=(req,res)=>{
    res.render('signupPage')
}

module.exports.login=(req,res)=>{
    res.render('loginPage')
}

module.exports.homePage=async(req,res)=>{
    // const userId=req.params.id1
    // let page=req.params.page
    // if (!page || page==0) page=1
    const id=req.params.id
    const user=await User.findOne({id:id})
    const tasks=await Task.find({userId:id}).select("-__v -userId")
    res.render('homePage',{tasks:tasks,userId:id,firstName:user.firstName})
}