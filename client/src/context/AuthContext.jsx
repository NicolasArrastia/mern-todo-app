import { useEffect } from 'react'
import { createContext, useState, useContext } from 'react'
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth.js'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const signOut = () => {
    try {
      logoutRequest()
      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()

      if (!cookies.token) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return null
      }

      try {
        const res = await verifyTokenRequest(cookies.token)

        if (!res.data) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return;
        }

        setIsAuthenticated(true)
        setUser(res.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false)
        setUser(null)
        setIsLoading(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      signOut,
      user,
      isAuthenticated,
      errors,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}