const express=require('express')
const router = express.Router()
const {loginAdmin}=require('../controllers/adminController')
const {protectAdmin}=require('../middleware/authMiddleware')
const { getUsers,editUser}=require('../controllers/adminController')
router.post('/users/',protectAdmin, getUsers)
router.put('/users/:userId',protectAdmin,editUser)
router.post('/adminlogin', loginAdmin)















module.exports=router