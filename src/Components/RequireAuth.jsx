import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import Login from './Login'

export default function RequireAuth({ children }) {
  const { user } = useContext(AuthContext)

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

  return children
}
