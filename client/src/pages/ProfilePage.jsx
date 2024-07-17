import React from 'react'
import { useAuth } from '../context/AuthContext'

const ProfilePage = () => {
  const { user } = useAuth()
  console.log(user)

  return (
    <div className='h-[calc(100vh-4rem)] flex items-center justify-center'>
      <div className='flex gap-2 bg-zinc-800 flex-col items-center rounded-md py-4 w-1/2'>
        <div className='size-24 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-4xl capitalize'>{user.username.split('')[0]}</div>
        <span className='text-2xl'>{user.username}</span>
        <span>{user.email}</span>
      </div>
    </div>
  )
}

export default ProfilePage