const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User=require('../model/userModel')
require('dotenv').config();

const protect=asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token=req.header.authorization.split(' ')[1]

            //verify
            const decoded=jwt.verify(token,process.env.JWT_SECRET)

            //get users
            req.user=await User.findById(decoded.id).select('__password')

            next()
            
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not Authorized')
            
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized,no token')
    }

})

module.exports={protect}
