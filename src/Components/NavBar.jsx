
import { Link } from "@tanstack/react-router"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

const NavBar = () => {
    const { user, isAdmin, logout } = useContext(AuthContext)

    return (
        <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow">
            <div className="flex gap-5 items-center">
                <Link to="/" className="text-lg font-medium hover:text-gray-300">
                Home
                </Link>
                <Link to="/users" className="text-lg font-medium hover:text-gray-300">
                Users
                </Link>
                {user && (
                    <Link to="/private" className="text-lg font-medium hover:text-gray-300">
                    Privado
                    </Link>
                )}
                {isAdmin && (
                    <Link to="/admin" className="text-lg font-medium hover:text-gray-300">
                    Admin
                    </Link>
                )}
            </div>

            {!user ? (
                <Link
                    to="/login"
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                >
                Iniciar sesion
                </Link>
            ) : (
                <button
                    type="button"
                    onClick={logout}
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium transition"
                >
                Cerrar sesion
                </button>
            )}
        </nav>
    )
}

export default NavBar;