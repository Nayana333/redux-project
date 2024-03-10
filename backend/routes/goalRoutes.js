const express=require('express')
const router=express.Router()
const {getGoals,setGoal,updateGoals,deleteGoals}=require('../controllers/goaslController')
const {protect}=require('../middleware/authMiddleware')

router.route('/').get(protect,getGoals).post(protect,setGoal)
router.route('/:id').delete(protect,deleteGoals).put(protect,updateGoals)


module.exports=router