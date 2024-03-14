const express=require('express')
const router = express.Router()
const {loginAdmin}=require('../controllers/adminController')
const {protectAdmin}=require('../middleware/authMiddleware')


router.post('/adminlogin', loginAdmin)















module.exports=router