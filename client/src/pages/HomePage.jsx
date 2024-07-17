import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold mb-4'>Task Manager</h1>
      <div className='flex gap-4  justify-center items-center'>
        <button onClick={() => navigate('/register')} className='rounded-md bg-zinc-700 font-bold px-4 py-2'>Register</button>
        <button onClick={() => navigate('/login')} className='rounded-md bg-zinc-700 font-bold px-4 py-2'>Login</button>
      </div>
    </div>
  )
}

export default HomePage