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

        //get users


    } catch (error) {
        console.log(error);
        res.status(401)
        throw new Error('Not Authorized')

    }
})

module.exports = { protect }
