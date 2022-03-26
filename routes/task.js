const express=require('express')
const router=express()

const taskController=require('../controllers/taskController')

router
      .post('/add/:id',taskController.add)
      .get('/getOne/:id/',taskController.getOne)
      .get('/getall/:id1/:page',taskController.getall)
      .patch('/update/:id/',taskController.update)
      .get('/delete/:id/',taskController.delete)



module.exports=router