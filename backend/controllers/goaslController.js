
//@ Get goals
//@ GET/api/goals
// @access Private


const getGoals=(req,res) =>{
    res.status(200).json({message:'Get goals'})

}

//@desc set goals
//@router  post/api/goals
//@ access Private


const setGoal=(req,res) =>{
    if(!req.body.text){
        res.status(400).json({message:'please add a text field'})
        throw new Error('please add a text field')

    }
    res.status(200).json({message:'Get goals'})
}
//@desc  ipdate goals
//@router put/api/goals
//@access Private

const updateGoals=(req,res) =>{
    res.status(200).json({message:`Update goal  ${req.params.id}`})

}

//@desc Get goals
//@router GET/api/goals:id
//@ access Private

const deleteGoals=(req,res) =>{
    res.status(200).json({message:`Delete goal  ${req.params.id}`})
}

module.exports={
    getGoals,
    setGoal,
    updateGoals,
    deleteGoals
}