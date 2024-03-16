const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')


//admin login

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    console.log(user, 'user');
    const token = generateTocken(user._id)
    console.log(token);
    if (user && user.isAdmin && user.password === password) {

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            profile: user.profileUrl,
            token: token

        })
        console.log(user.token);

    } else {
        res.status(400)
        throw new Error('Not Authorized')
    }

    const adminAccount = asyncHandler(async (req, res) => {
        res.json({ message: 'Admin and user data' })
    })
})

const generateTocken = (id) => {

    const secret = process.env.JWT_SECRET || 'abc123';
    return jwt.sign({ id }, secret, { expiresIn: '30d' });
};


// const getUsers = asyncHandler(async (req, res) => {
//     const users = await User.find({ isAdmin: false })
//     console.log(users);
//     if (users) {
//         res.status(200).json({ users })
//     }
//     else {
//         res.status(400)
//             throw new Error('user not found')

//     }
// })


const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false });
        if (users && users.length > 0) {
            res.status(200).json({ status: true, users: users });
        } else {
            res.status(404).json({ message: "No users found" });
            console.log('No users found');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const editUser=asyncHandler(async(req,res)=>{
    const {userId,name,email}=req.body
    const updateUser=await User.findByIdAndUpdate(userId,{name,email},{new:true})
    if (!updateUser) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const users=await User.find({isAdmin:false})
    if(users){
        res.status(200).json({users})
    }else{
        res.status(404)
            throw new Error('user not found')
        
    }
})


module.exports = {
    loginAdmin,
    getUsers,
    editUser

}
