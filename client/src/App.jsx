import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TasksProvider } from './context/TasksContext'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import TasksPage from './pages/TasksPage'
import TaskFormPage from './pages/TaskFormPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  return (
    <AuthProvider>
      <TasksProvider>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/tasks' element={<TasksPage />}></Route>
              <Route path='/add-task' element={<TaskFormPage />}></Route>
              <Route path='/tasks/:id' element={<TaskFormPage />}></Route>
              <Route path='/profile' element={<ProfilePage />}></Route>
            </Route>
            <Route path='*' element={<div>404</div>}></Route>
          </Routes>
        </BrowserRouter>

      </TasksProvider>
    </AuthProvider>
  )
}

export default App