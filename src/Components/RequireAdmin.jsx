import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import Login from './Login'

export default function RequireAdmin({ children }) {
  const { user, isAdmin } = useContext(AuthContext)

  if (!user) {
    return (
      <div>
        <p className="mb-4 text-red-600 font-medium">
          Debes iniciar sesion para ver este apartado.
        </p>
        <Login />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="p-4 rounded border border-red-200 bg-red-50 text-red-700">
        Este apartado es solo para administradores.
      </div>
    )
  }

  return children
}
