import axios from "axios";

const API_URL='/api/admin/'

const adminLogin=async(adminData)=>{
    
    const response=await axios.post(API_URL+'adminlogin',adminData)
    if(response.data){
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data
}

//logout

const adminLogout=()=>{
    localStorage.removeItem('admin')
}
// get user
const getAllUsers=async(token)=>{
    
    const config={
        headers:{
            Authorization:`${token}`
        }
    }
    const response = await axios.get(API_URL+'users', config);
    console.log(response.data);
    return response.data
}


const adminAuthService={
    adminLogin,
    adminLogout,
    getAllUsers
}
export default adminAuthService