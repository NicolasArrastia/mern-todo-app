import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks')
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (formValues) => {
    signUp(formValues)
  })

  return (
    <div className='flex items-center justify-center min-h-screen'>

      <form className='bg-zinc-800 max-w-md p-10 rounded-md' onSubmit={onSubmit}>
        <h1 className='text-center text-2xl font-bold mb-2'>Sign Up</h1>

        {registerErrors.map((err, i) => <div key={i} className='bg-red-500 p-2 text-white mb-2  text-center rounded-md'>{err}</div>)}

        <input placeholder='username' className='my-2 w-full bg-zinc-700 text-white px-4 py-2 rounded-md' type="text" {...register('username', { required: true })} />
        {errors.username && <p className='text-red-500'>Username is required</p>}

        <input placeholder='email' className='my-2 w-full bg-zinc-700 text-white px-4 py-2 rounded-md' type="text" {...register('email', { required: true })} />
        {errors.email && <p className='text-red-500'>Email is required</p>}

        <input placeholder='password' className='my-2 w-full bg-zinc-700 text-white px-4 py-2 rounded-md' type="password" {...register('password', { required: true })} />
        {errors.password && <p className='text-red-500'>Password is required</p>}


        <div className='flex flex-col'>
          <button type='submit' className='my-2 w-full bg-zinc-700 font-bold px-4 py-2 rounded-md'>Register</button>
          <p className='gap-x-2 text-center'>Already have an account? <Link to={'/login'} className='text-sky-500'>Sign In</Link></p>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage