import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000/api'

function Admin() {
  const [techniques, setTechniques] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    name: '',
    description: '',
    materials: '',
    difficulty: 'Básico',
    image_url: ''
  })

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchTechniques()
  }, [])

  const fetchTechniques = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_URL}/techniques`)
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Error al cargar las técnicas')
      }

      setTechniques(data.data)
    } catch (err) {
      console.error('Error fetching techniques (admin):', err)
      setError(err.message || 'Error al cargar las técnicas')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/techniques`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.errors?.join(', ') || data.message || 'Error al crear la técnica'
        )
      }

      // Actualizar lista en memoria sin recargar todo
      setTechniques((prev) => [...prev, data.data])

      // Limpiar formulario
      setForm({
        name: '',
        description: '',
        materials: '',
        difficulty: 'Básico',
        image_url: ''
      })
    } catch (err) {
      console.error('Error creating technique:', err)
      setError(err.message || 'Error al crear la técnica')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      '¿Seguro que quieres eliminar esta técnica? Esta acción no se puede deshacer (en esta sesión).'
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(`${API_URL}/techniques/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Error al eliminar la técnica')
      }

      setTechniques((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      console.error('Error deleting technique:', err)
      setError(err.message || 'Error al eliminar la técnica')
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-primary mb-6">
        Panel de Administración
      </h1>

      <p className="text-gray-600 mb-6 text-sm">
        Este panel es solo para fines académicos. Los cambios se guardan en
        memoria mientras el servidor está encendido (sin base de datos real).
      </p>

      {/* Formulario de creación */}
      <section className="mb-10 bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Crear nueva técnica
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary focus:border-purple-primary"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dificultad
            </label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary focus:border-purple-primary bg-white"
            >
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary focus:border-purple-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Materiales
            </label>
            <textarea
              name="materials"
              value={form.materials}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary focus:border-purple-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de imagen (opcional)
            </label>
            <input
              type="text"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="/images/nombre-de-tu-imagen.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary focus:border-purple-primary"
            />
            <p className="text-xs text-gray-500 mt-1">
              Puedes usar rutas como <code>/images/lapiz-grafito.jpg</code>.
            </p>
          </div>

          <div className="md:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center px-6 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-60"
            >
              {submitting ? 'Guardando...' : 'Guardar técnica'}
            </button>
          </div>
        </form>
      </section>

      {/* Lista de técnicas */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Técnicas registradas
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-primary mb-4"></div>
            <p className="text-purple-primary">Cargando técnicas...</p>
          </div>
        ) : techniques.length === 0 ? (
          <p className="text-gray-600">No hay técnicas registradas.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dificultad
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imagen
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {techniques.map((technique) => (
                  <tr key={technique.id}>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {technique.id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {technique.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {technique.difficulty}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {technique.image_url || '-'}
                    </td>
                    <td className="px-4 py-2 text-sm text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(technique.id)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default Admin


