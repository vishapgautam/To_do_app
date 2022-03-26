const express=require('express')
const path=require('path')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const morgan=require('morgan')
const bodyParser=require('body-parser')
require('./config/mongo')
dotenv.config({path:'./config/.env'})
const app=express()


app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit: 50000
  }));
  app.use(bodyParser.json());
app.use(express.json())
// app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))



const routeMain=require('./routes/index')
const taskRoute=require('./routes/task')
const homeRoute=require('./routes/main')


app.use('/home/',routeMain)
app.use('/task',taskRoute)
app.use('/',homeRoute)


const PORT=process.env.PORT||4000
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))