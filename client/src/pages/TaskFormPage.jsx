import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext'
import { Link, useNavigate, useParams } from 'react-router-dom'

const TaskFormPage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const { createTask, getTask, updateTask } = useTasks()
  const navigate = useNavigate()
  const params = useParams();
  console.log(errors)

  useEffect(() => {
    async function loadTask() {

      console.log(params)
      if (params.id) {
        const task = await getTask(params.id)
        setValue('title', task.title)
        setValue('description', task.description)
      }
    }
    loadTask()
  }, [])


  const onSubmit = handleSubmit((formData) => {
    if (params.id) {
      updateTask(params.id, formData)
    } else {
      createTask(formData)
    }

    navigate('/tasks')
  })

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md w-1/2'>
        <form onSubmit={onSubmit}>
          <Link to="/tasks" className='text-blue-500'>Back</Link>
          <h1 className='text-4xl font-bold'>Add New Task</h1>
          <input
            type="text"
            placeholder='Title'
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mt-4'
            {...register('title', { required: "Title is required" })}
            autoFocus
          />
          {errors.title && <p className='text-red-500 mb-2'>{errors.title.message}</p>}

          <textarea
            rows={3}
            placeholder='Description'
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mt-4'
            {...register('description', { required: "Description is required" })}>
          </textarea>
          {errors.description && <p className='text-red-500 mb-2'>{errors.description.message}</p>}

          <button className='my-2 w-full bg-zinc-700 font-bold px-4 py-2 rounded-md'>{params.id ? "Update" : "Create"}</button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage