const jwt = require('jsonwebtoken'); //use for json web token
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')// make an easy way to catch errors
const User = require('../model/userModel')
require('dotenv').config();


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('user already exist')

    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //create user

    const user = await User.create({
        name, email, password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateTocken(user._id)

        })
    }
    else {
        res.status(400)
        throw new Error('invalid user data')
    }
})


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    //check for email

    const user = await User.findOne({ email: email })
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateTocken(user._id)

        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')

    }

})



const getMe = asyncHandler(async (req, res) => {

  

    res.status(200).json(req.user)
})


//generate a token


// const generateTocken=(id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET,{
//         expiresIn:'30d'
//     })
// }

const generateTocken = (id) => {
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';
    return jwt.sign({ id }, secret, { expiresIn: '30d' });
};




module.exports = {
    registerUser,
    loginUser,
    getMe
}