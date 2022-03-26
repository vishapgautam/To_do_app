const express=require('express')
const router=express.Router()

const homeController=require('../controllers/homeController')

router
      .post('/signup',homeController.signup)
      .post('/login',homeController.login)
      .patch('/update/:id',homeController.update)
      .delete('/delete/:id',homeController.delete)
      // .get('/getall',homeController.getall)
      .get('/getOne/:id',homeController.getOne)



module.exports=router