import axios from "axios";

const API_URL = 'http://localhost:5000/api/admin/'

const adminLogin = async (adminData) => {

    const response = await axios.post(API_URL + 'adminlogin', adminData)
    if (response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
    }
    return response.data
}

//logout

const adminLogout = () => {
    localStorage.removeItem('admin')
}
// get user
const getAllUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }
    const response = await axios.post(API_URL + 'users', null, config);
    return response.data
}

//edit user

const editUserDetails = async (token, userId, name, email) => {
    const config = {
        headers: {
            Authorization: `${token}`
        }
    };

    const userData = {
        name: name,
        email: email,
        userId:userId
    };

    const response = await axios.put(`${API_URL}users/${userId}`, userData, config);
    return response.data;
};


const adminAuthService = {
    adminLogin,
    adminLogout,
    getAllUsers,
    editUserDetails
}
export default adminAuthService
