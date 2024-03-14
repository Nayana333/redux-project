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

const adminAuthService={
    adminLogin,
    adminLogout
}
export default adminAuthService
