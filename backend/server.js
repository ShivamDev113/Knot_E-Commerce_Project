require('dotenv').config();
const { connect } = require('mongoose');
const app =require('./src/app')
const port =process.env.PORT || 3000
const connectDB=require('./src/db/db')
const connectCloudinary=require('./src/db/cloudinary')

connectDB()
connectCloudinary()


app.get('/',(req,res)=>{    
    res.send("API Working....")
})



app.listen(port,()=>{
    console.log("Server is running at port :- " + port)
})