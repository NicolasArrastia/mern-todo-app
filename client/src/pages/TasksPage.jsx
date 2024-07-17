import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TasksContext'
import TaskCard from '../components/TaskCard'

const TasksPage = () => {
  const { getTasks, tasks } = useTasks()

  useEffect(() => {
    getTasks()
  }, [])

  if (tasks.length === 0) {
    return <h1>There are no tasks yet</h1>
  }

  return (
    <div className='p-4 grid grid-cols-2 lg:grid-cols-3 gap-4'>{tasks.map((task, i) => <TaskCard task={task} key={i} />)}</div>
  )
}

export default TasksPage