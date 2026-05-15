const express = require('express');
const cors=require('cors');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const app=express();

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order' , orderRouter)

module.exports=app;