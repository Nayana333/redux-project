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
  const [errors, setErrors] = useState({});

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    state => state.admin
  );

  useEffect(() => {
    if (!admin) {
      navigate('/admin/adminlogin')
    }
    if (admin) {
      window.location.href = '/admin'
    }
  }, [admin, dispatch, navigate]);

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const adminData = {
        email,
        password,
      };
      dispatch(adminLogin(adminData));
      window.location.href = '/admin'
    }
  };

  return (
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
              className={`form-control ${errors.email && 'is-invalid'}`}
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
          </div>
          <div className='form-group'>
            <input
              type='password'
              className={`form-control ${errors.password && 'is-invalid'}`}
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
            {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AdminLogin
