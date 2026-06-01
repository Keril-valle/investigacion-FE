import RequireAuth from '../Components/RequireAuth'

const PrivatePage = () => {
  return (
    <RequireAuth>
      <div className="p-4 rounded border bg-green-50 border-green-200">
        <h2 className="text-xl font-semibold mb-2">Apartado privado</h2>
        <p>Solo usuarios logueados pueden ver este contenido.</p>
      </div>
    </RequireAuth>
  )
}

export default PrivatePage
