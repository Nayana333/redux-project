
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


const protectAdmin = asyncHandler(async (req, res, next) => {
    console.log(req.headers.authorization);
    if (req.headers.authorization) {
        try {
            let token = req.headers.authorization
            jwt.verify(token, process.env.JWT_SECRET, async (err, success) => {
                if (err) {
                    if (err.message === 'TokenExpirationError') {
                        console.log('Expired');
                        return next()
                    } else {
                        console.log(err);
                        return next()
                    }
                } else {
                    req.admin = await User.findById(success.id)
                    return next()
                }
            })


        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error("Not authorized")
        }
    }
})


module.exports = { protect, protectAdmin }
