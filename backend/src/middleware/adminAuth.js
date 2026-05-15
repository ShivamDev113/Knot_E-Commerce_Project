const jwt = require('jsonwebtoken')

const adminAuth = async(req,res,callback)=>{

    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:false , message:'Not Authorized Login Again'})
        }
        const token_decode=jwt.verify(token , process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){ 
            return res.json({success:false , message:'Not Authorized Login Again'})
        }
        callback()
    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
    }
}

module.exports = adminAuth