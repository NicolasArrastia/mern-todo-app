import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, signOut, user } = useAuth()

  const navigate = useNavigate()

  const handleLogOut = () => {
    signOut()
    navigate('/')
  }

  if (isLoading) return <h1>Loading...</h1>

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <header className='bg-zinc-700 p-2 flex items-center gap-6'>
        <h1 className='text-xl'>Task Manager</h1>
        <nav className='flex gap-2 underline'>
          <Link to={'/tasks'}>Tasks</Link>
          <Link to={'/add-task'}>New Task</Link>
          <Link to={'/profile'}>Profile</Link>
        </nav>
        <span className='ml-auto'>Welcome <b>{user.username}</b></span>
        <button onClick={handleLogOut} className='rounded-md bg-zinc-800 font-bold px-4 py-2'>Log Out</button>
      </header>
      <Outlet />
    </>
  )
}

export default ProtectedRoute