import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Profile from './pages/profile';
import Login from './pages/Login';
import Header from './component/Header';
import { ToastContainer } from 'react-toastify';//display notification
import 'react-toastify/dist/ReactToastify.css';
import { register, reset } from './features/auth/authSlice';
import AdminDashboard from './pages/admin/adminDashboard'
import AdminHeader from './component/AdminHeader';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
 
  return (
    <>
      <Router>
        <div className='container'>
          
          <Routes>
            <Route path="/admin/*" element={<AdminHeader/>} />{/* path start with admin*/}
            <Route path="*" element={<Header />} /> {/* user without /admin* go to header*/ }
          </Routes>    
          <Routes>
              {/* user routes */}
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile/>}/>


            {/* admin routes */}
            <Route path='/admin' element={<AdminDashboard/>} />
            <Route path='/admin/adminlogin' element={<AdminLogin/>} />

            


          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
