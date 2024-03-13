
import {useEffect, useState } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux' //access redux store and dispatch actions
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../component/Spinner'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  


function Login() {
    const [formData,setFormData]=useState({
        email:'',
        password:'',
     
    })

    const {email,password}=formData

    const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))

    }

    const onSubmit=(e)=>{
        e.preventDefault()
        const userData={
          email,password
        }

        dispatch(login(userData))
    }

    if(isLoading){
      return <Spinner/>
    }
  return (
    <>
    <section className='heading'>
        <h1>
        <FaSignInAlt/> Login
        </h1>
        <p>Login and start set goals </p>
    </section>


    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
         
         <div className='form-group'>
         {/* <ToastContainer /> */}


    <input type='text' className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/></div>
         
         <div className='form-group'>
    <input type='password' className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}/></div>
         
        
         </div> 
        </form>
      <form className='form-group'>
        <button type='button' onClick={onSubmit} className='btn btn-block'>Submit</button>
      </form>
    </section>

    </>
  )
}

export default Login