const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../model/userModel')


//admin login

const loginAdmin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email:email})
    
    console.log(user,'user');
    const token=generateTocken(user._id)
    console.log(token);
    if(user && user.isAdmin && user.password===password){
      
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            profile:user.profileUrl,
            token:token

        })
        console.log(user.token);
        
    }else{
        res.status(400)
        throw new Error('Not Authorized')
    }

    const adminAccount=asyncHandler(async(req,res)=>{
        res.json({message:'Admin and user data'})
    })
})

const generateTocken = (id) => {
   
    const secret = process.env.JWT_SECRET || 'abc123';
    return jwt.sign({ id }, secret, { expiresIn: '30d' });
};

module.exports={
    loginAdmin,
    

}
