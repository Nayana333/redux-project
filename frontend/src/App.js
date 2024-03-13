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


function App() {
 
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
