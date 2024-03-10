const expres=require('express')
const router=expres.Router()
const {registerUser, getMe,loginUser}=require('../controllers/userController')
const {protect}=require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',getMe,protect)



module.exports=router