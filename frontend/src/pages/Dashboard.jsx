import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import GoalForm from '../component/GoalForm'
import Spinner from '../component/Spinner'
import { getGoals } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate=useNavigate()
  const dispatch=useDispatch()


  const {user}=useSelector((state)=>state.auth)
  const {goals,isLoading,isError,message}=useSelector((state)=>state.goal)

  useEffect(()=>{
    if(isError){
      console.log(message);
    }
    if(!user){
      navigate('/login')
    }
    dispatch(getGoals())
  },[user,navigate])

  return (
    <>
    <section className="heding">
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
    </section>
    <GoalForm/>
    </>
  )
}

export default Dashboard
