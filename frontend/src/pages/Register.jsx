
import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../component/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

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

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
      newErrors.name = 'Name must contain letters only'
      isValid = false
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is not valid'
      isValid = false
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required'
      isValid = false
    }

    // Confirm Password validation
    if (!password2.trim()) {
      newErrors.password2 = 'Confirm password is required'
      isValid = false
    } else if (password !== password2) {
      newErrors.password2 = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    } else {
      toast.error('Please correct the errors in the form')
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='login-card'>
        <section className='heading'>
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please create an account</p>
        </section>

        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className={`form-control ${errors.name && 'is-invalid'}`}
                id='name'
                name='name'
                value={name}
                placeholder='Enter your name'
                onChange={onChange}
              />
              {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
            </div>
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
              <input
                type='password'
                className={`form-control ${errors.password2 && 'is-invalid'}`}
                id='password2'
                name='password2'
                value={password2}
                placeholder='Confirm password'
                onChange={onChange}
              />
              {errors.password2 && <div className='invalid-feedback'>{errors.password2}</div>}
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default Register
