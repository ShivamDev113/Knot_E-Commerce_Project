// Middleware->
// 1. Middleware is a function that runs between the request and the response.
// 2. We use middleware to handle common logic that should run before the main controller.

const jwt=require('jsonwebtoken')

const authUser=async (req,res,next)=>{
   
    const {token}=req.headers;

    if(!token){
      return res.json({success:false, message:'Not Authorizzed'})
    }
    try {
        const token_decode=jwt.verify(token , process.env.JWT_SECRET)
        req.body.userId=token_decode.id
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

module.exports=authUser;