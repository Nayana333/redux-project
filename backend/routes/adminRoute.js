const express=require('express')
const router = express.Router()
const {loginAdmin}=require('../controllers/adminController')
const {protectAdmin}=require('../middleware/authMiddleware')
const { getUsers,editUser,userBlock,searchUser,registerUser}=require('../controllers/adminController')
router.post('/users/',protectAdmin, getUsers)
router.put('/users/:userId',protectAdmin,editUser)
router.put('/users/:userId',protectAdmin,editUser)
router.post('/block',protectAdmin,userBlock)
router.post('/search',protectAdmin,searchUser)
router.post('/adminlogin', loginAdmin)
router.post('/addUser',protectAdmin,registerUser)
















module.exports=router