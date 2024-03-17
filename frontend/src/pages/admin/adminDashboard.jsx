import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserList from '../../component/UserList';
import { FaSearch } from 'react-icons/fa';
import { searchUser,getAllUsers } from '../../features/adminAuth/adminAuthSlice'; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);
  const [searchQuery, setsearchQuery] = useState('');

  useEffect(()=>{

    if (!admin) {
      navigate('/admin/adminLogin')
    }
    if(searchQuery){
      
      dispatch(searchUser(searchQuery))
    }else{
      dispatch(getAllUsers())
    }
    
    
  },[dispatch,admin,navigate,searchQuery])


  const handleSearchchange=(e)=>{
    e.preventDefault()
    setsearchQuery(e.target.value)
      }
      if(!admin){
        return null;
      }

      const onAddUser=(e)=>{
        e.preventDefault()
        navigate('/admin/adduser')
      }

  return (
    <div>
      <div style={{display:'flex'}}  className='form-group'>
            <input style={{height:'35px',width:'452px',marginLeft:'177px'}} className='form-control' placeholder='username/email'  type='text'
      value={searchQuery}
      onChange={handleSearchchange} />
            <button style={{height:'35px',marginLeft:'-39px',background:'transparent',border:'transparent'}} className='btn-1'> <FaSearch/> </button>
            <div>
            <button className='btn btn-block' style={{ marginLeft:'173px',width:'106px'}} onClick={onAddUser}>AddUser</button>
            </div>
        </div>
      <h1>Welcome {admin && admin.name}</h1>
      <UserList />
    </div>
  );
};

export default AdminDashboard;
