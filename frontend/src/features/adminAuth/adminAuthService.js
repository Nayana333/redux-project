import axios from "axios";

const API_URL = 'http://localhost:5000/api/admin/'

const adminLogin = async (adminData) => {
    const response = await axios.post(API_URL + 'adminlogin', adminData)
    console.log(response);
    if (response.status === 200) {
        localStorage.setItem('admin', JSON.stringify(response.data))
        return response.data
    }
    return null
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
        userId: userId
    };

    const response = await axios.put(`${API_URL}users/${userId}`, userData, config);
    return response.data;
};


//blockuser


const userBlock = async (token, userId) => {
    const config = {
        headers: {
            Authorization: `${token}`
        }

    }
    const response = await axios.post(API_URL + 'block', { userId }, config)
    return response.data
}


//search user


const searchUser = async (query, token) => {
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const response = await axios.post(API_URL + 'search', { query }, config)
    return response.data

}

const addUser = async (userData, token) => {


    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const response = await axios.post(API_URL + 'addUser', { userData }, config)
    return response.data
}

const adminAuthService = {
    adminLogin,
    adminLogout,
    getAllUsers,
    editUserDetails,
    userBlock,
    searchUser,
    addUser
}
export default adminAuthService
