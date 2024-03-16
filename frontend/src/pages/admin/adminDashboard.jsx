import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserList from '../../component/UserList'


const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
   
    if(admin){  
     navigate('/admin')
    }
    if (!admin) {
      navigate('/admin/adminlogin');
    }
  }, [admin, navigate]);

  return (
    <div>
    <h1>Welcome {admin && admin.name}</h1>
    <UserList/>
    
    </div>
  );
}

export default AdminDashboard;

