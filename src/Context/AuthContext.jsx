import { createContext, useState, useEffect } from 'react'
import { useLogin } from '../Hooks/useLogin'
import { decodeToken, client as axiosClient } from '../Services/AuthService'

export const AuthContext = createContext()

function getRoleFromTokenData(data) {
  return (
    data?.role ||
    data?.roles ||
    data?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  )
}

function checkIsAdmin(userData) {
  const role = getRoleFromTokenData(userData)

  if (Array.isArray(role)) {
    return role.some((r) => String(r).toLowerCase() === 'admin')
  }

  if (typeof role === 'string' && role.toLowerCase() === 'admin') {
    return true
  }

  // Fallback for DE credentials shown in class material.
  return String(userData?.email || '').toLowerCase() === 'admin'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const { mutateAsync: loginMutation, isPending, isError } = useLogin()
  const isAdmin = checkIsAdmin(user)

  const login = async (email, password) => {
    const newToken = await loginMutation({ email, password })
    localStorage.setItem('authToken', newToken)
    axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`
    setToken(newToken)
    const data = decodeToken(newToken)
    setUser({ email, ...data })
    return data
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    delete axiosClient.defaults.headers.common.Authorization
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    const stored = localStorage.getItem('authToken')
    if (stored) {
      setToken(stored)
      axiosClient.defaults.headers.common.Authorization = `Bearer ${stored}`
      const data = decodeToken(stored)
      setUser({ email: data.email, ...data })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin,
        login,
        logout,
        loginLoading: isPending,
        loginError: isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
