import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

const GoalItem = ({ goal }) => {
    const dispatch = useDispatch()
    return (
        <div className='goal'>
            <div>
                {new Date(goal.createdAt).toLocaleString('en-US')}
            </div>
            <p>{goal.text}</p>
            <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>X</button>
        </div>
    )
}

export default GoalItem
