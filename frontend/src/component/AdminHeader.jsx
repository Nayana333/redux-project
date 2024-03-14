import React from 'react'
import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { adminlogout,reset } from '../features/adminAuth/adminAuthSlice'





const AdminHeader = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {admin}=useSelector((state)=>state.admin)


    const onLogout=()=>{
        dispatch(adminlogout())
        dispatch(reset())
        navigate('/admin')

    }


  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/admin'>GoalSetter</Link>
        </div>
        <ul>
            {admin ? (
                <>
                 <li>
                 <button className='btn' onClick={onLogout}>
                     <FaSignOutAlt/>Logout
                     </button>
                 
                 
             </li>
             <li>
             <Link to='#'>
                <FaUser/>profile
            </Link>
                                  
             </li>
             
             </> ):(<>
            <li>
            <Link to='/admin/adminlogin'>
                <FaSignInAlt/>Login
            </Link>
        </li>
        <li>
            
        </li>
            </>)}
            
        </ul>
     
    </header>
  )
}

export default AdminHeader
