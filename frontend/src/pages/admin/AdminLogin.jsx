import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogin, reset } from '../../features/adminAuth/adminAuthSlice'

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    state => state.admin
  );

  useEffect(() => {
    if(!admin){
      navigate('/admin/adminlogin')
    }
    if (admin) {
     
      navigate("/admin");
      dispatch(reset());
    }
  }, [admin, dispatch, navigate]);

  
  
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const adminData = {
      email,
      password,
    };
    dispatch(adminLogin(adminData));
  };

 
  return (
    < >

      <div className='adminLogin-card'>
        <section className='heading'>
          <h1>
            <FaUser />Admin Login
          </h1>
          <p>Authorized login only</p>
        </section>

        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Login
              </button>
            </div>
          </form>
        </section>

      </div>

    </>
  )
}

export default AdminLogin

