const express=require('express')
const router=express()

const mainController=require('../controllers/mainController')

router
      .get('/',mainController.mainpage)
      .get('/signup',mainController.signup)
      .get('/login',mainController.login)
      .get('/:id',mainController.homePage)


module.exports=router