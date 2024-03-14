const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' });
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')



const protect = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization
        console.log(token, process.env.JWT_SECRET);
        //verify
        jwt.verify(token, 'abc123', async (err, success) => {
            if (err) {
                if (err.message === 'TokenExpirationError') {
                    console.log('Expired');
                    return next()
                } else {
                    console.log(err);
                    return next()
                }
            } else {
                req.user = await User.findById(success.id)
                console.log(req.user);
                return next()
            }
        })
        //get user

    } catch (error) {
        console.log(error);
        res.status(401)
        throw new Error('Not Authorized')

    }
})




//admin


const protectAdmin=asyncHandler(async(req,res,next)=>{
    let token 
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]
    
            //verify
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
            //GET admin from token
            req.admin=await User.findById(decoded.id).select('-password')
    
            next()
        }catch(error){
         console.log(error);
         res.status(401)
         throw new Error("Not authorized")
        }
    }
})


module.exports = { protect, protectAdmin}
