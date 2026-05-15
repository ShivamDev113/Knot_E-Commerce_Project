    const mongoose=require('mongoose')

    function connectDB(){
        mongoose.connect(process.env.MONGODB_URI)
        .then(()=>console.log("MongoDB Connected"))
        .catch(error=>console.error("MongoDB Connection Error"+error)
    )
    }

    module.exports=connectDB;