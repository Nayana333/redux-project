import axios from 'axios'

const API_URL = 'http://localhost:5000/goals/'

//create new goals

const createGoal=async (goalData,token)=>{
    const config={
        headers:{
            Authorization:  `${token}`
        }
    }

    const response=await axios.post(API_URL,goalData,config)
    return response.data
}


const getGoal=async (token)=>{
    const config={
        headers:{
            Authorization:  `${token}`
        }
    }

    const response=await axios.get(API_URL,config)
    console.log(response);
    return response.data
}


const deleteGoal=async(goalId,token)=>{
    alert(goalId)
    const config={
      headers:{
          Authorization:`${token}`
      }
    }  
  
    const response =await axios.delete(API_URL +goalId,config)
  
    return response.data
  }
const goalService={
    createGoal,
    getGoal,
    deleteGoal
}

export default goalService