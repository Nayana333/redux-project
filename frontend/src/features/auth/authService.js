import axios from 'axios';

const API_URL = 'http://localhost:5000/';

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout
const logout = () => {
    localStorage.removeItem('user');
};

// Upload profile
// const profileUpload = async (token, url) => {
//     const config = {
//         headers: {
//             Authorization: `${token}`
//         }
//     };
//     const liveUser = JSON.parse(localStorage.getItem('user'));
//     const response = await axios.post(API_URL + 'profile/upload', { url, liveUser }, config);

//     const userString = localStorage.getItem('user');

//     if (userString) {
//         const user = JSON.parse(userString);
//         user.profileUrl = response.data.profileUrl;
//         localStorage.setItem('user', JSON.stringify(user));
//     }
//     return response.data;
// };

const profileUpload = async (token, url) => {
 
    localStorage.setItem('url',JSON.stringify(url));

    const config = {
        headers: {
            Authorization: `${token}`
        }
    };
    const liveUser = JSON.parse(localStorage.getItem('user'));
    console.log(liveUser, 'User');
    const response = await axios.post(API_URL + 'profile/upload', { url, liveUser }, config);
    console.log(response);
    const userString = localStorage.getItem('user');

    if (userString) {
        const user = JSON.parse(userString);
        user.profileUrl = response.data.profileUrl;
        localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
}

const authService = {
    register,
    login,
    logout,
    profileUpload
};

export default authService;