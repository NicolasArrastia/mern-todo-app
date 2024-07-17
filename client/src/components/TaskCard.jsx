import React from 'react'
import { useTasks } from '../context/TasksContext'
import { Link } from 'react-router-dom'

const TaskCard = ({ task }) => {
  const { title, description, date, _id } = task
  const { deleteTask } = useTasks()


  const handleDeleteTask = async () => {
    await deleteTask(_id)
  }
  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <header className='flex justify-between items-center'>
        <h3 className='text-2xl font-bold'>{title}</h3>
        <div className='flex gap-2'>
          <Link className='rounded-md bg-blue-500 font-bold px-2' to={`/tasks/${_id}`}>Edit</Link>
          <button className='rounded-md bg-red-500 font-bold px-2' onClick={() => handleDeleteTask()}>Delete</button>
        </div>
      </header>
      <p className='text-slate-300'>{description}</p>
      <p>{new Date(date).toLocaleDateString()}</p>
    </div>
  )
}

export default TaskCard