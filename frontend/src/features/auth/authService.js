import axios from 'axios'

const API_URL='http://localhost:5000/'

//register user

const register=async(userData)=>{
    const response=await axios.post(API_URL,userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}
//login user
const login=async(userData)=>{
    const response=await axios.post(API_URL + 'login',userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}
//logout

const logout=()=>{
    localStorage.removeItem('user')
}
 //edit user
// const editUserDetails=async(token,id,name,email)=>{
//     const config={
//         headers:{
//             Authorization:`Beaber ${token}`
//         }
//     }

  
// }

const authService={
    register,
    logout,
    login
}

export default authService
