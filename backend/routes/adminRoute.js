const express=require('express')
const router = express.Router()
const {loginAdmin}=require('../controllers/adminController')
const {protectAdmin}=require('../middleware/authMiddleware')
const { getUsers}=require('../controllers/adminController')
router.get('/users', getUsers)

router.post('/adminlogin', loginAdmin)















module.exports=router