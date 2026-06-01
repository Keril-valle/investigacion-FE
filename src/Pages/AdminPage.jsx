import RequireAdmin from '../Components/RequireAdmin'

const AdminPage = () => {
  return (
    <RequireAdmin>
      <div className="p-4 rounded border bg-amber-50 border-amber-200">
        <h2 className="text-xl font-semibold mb-2">Panel admin</h2>
        <p>Este apartado es exclusivo para administradores.</p>
      </div>
    </RequireAdmin>
  )
}

export default AdminPage
