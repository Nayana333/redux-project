const asyncHandler=require('express-async-handler')
const Goal=require('../model/goalModel')
const User=require('../model/userModel')


//@ Get goals
//@ GET/api/goals
// @access Private

const getGoals=asyncHandler(async(req,res) =>{
    const goals=await Goal.find({user:req.user.id})
    res.status(200).json(goals)

})


//@desc set goals
//@router  post/api/goals
//@ access Private


const setGoal=asyncHandler(async(req,res) =>{
  
    if(!req.body.text){
        res.status(400).json({message:'please add a text field'})
        throw new Error('please add a text field')   

    }
    const goal=await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal)
})



//@desc  ipdate goals
//@router put/api/goals
//@access Private

const updateGoals=asyncHandler(async(req,res) =>{

    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
     //match the logged user 
    if(goal.user.tostring() !==req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal=await Goal.findByIdAndUpdate(req.param.id,req.body,{new:true})
    res.status(200).json(updatedGoal)

})

//@desc Get goals
//@router GET/api/goals:id
//@ access Private

const deleteGoals=asyncHandler(async(req,res) =>{
    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
     //match the logged user 
    if(goal.user.tostring() !==req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await goal.remove()
    res.status(200).json({id:req.params.id})
})

module.exports={
    getGoals,
    setGoal,
    updateGoals,
    deleteGoals
}