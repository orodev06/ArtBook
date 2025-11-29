import { useState, useEffect } from 'react'
import TechniqueCard from '../components/TechniqueCard'

const API_URL = 'http://localhost:3000/api'

function Home() {
  const [techniques, setTechniques] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('')

  useEffect(() => {
    fetchTechniques()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTechniques = async (options = {}) => {
    const { search: searchParam = search, difficulty: difficultyParam = difficulty } = options

    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (searchParam) params.append('search', searchParam)
      if (difficultyParam) params.append('difficulty', difficultyParam)

      const url =
        params.toString().length > 0
          ? `${API_URL}/techniques?${params.toString()}`
          : `${API_URL}/techniques`

      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Error al cargar las técnicas')
      }

      setTechniques(data.data)
    } catch (err) {
      console.error('Error fetching techniques:', err)
      setError(err.message || 'Error al cargar las técnicas')
      setTechniques([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchTechniques({ search, difficulty })
  }

  const handleDifficultyChange = (e) => {
    const value = e.target.value
    setDifficulty(value)
    fetchTechniques({ search, difficulty: value })
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Barra de búsqueda y filtros */}
      <section className="mb-8 bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row gap-4 items-stretch md:items-end"
        >
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Buscar técnica
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ejemplo: acuarela, lápiz, sombreado..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary focus:border-purple-primary"
            />
          </div>

          <div className="w-full md:w-56">
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dificultad
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary focus:border-purple-primary bg-white"
            >
              <option value="">Todas</option>
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>

          <div className="w-full md:w-auto">
            <button
              type="submit"
              className="w-full md:w-auto inline-flex justify-center items-center px-6 py-2.5 bg-purple-primary text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors mt-1 md:mt-0"
            >
              Buscar
            </button>
          </div>
        </form>
      </section>

      {/* Contenido principal */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-primary mb-4"></div>
          <p className="text-purple-primary text-xl">Cargando técnicas...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            type="button"
            onClick={() => fetchTechniques({ search: '', difficulty: '' })}
            className="inline-flex items-center px-6 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      ) : techniques.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-2">
            No se encontraron técnicas con esos filtros.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setDifficulty('')
              fetchTechniques({ search: '', difficulty: '' })
            }}
            className="inline-flex items-center px-6 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Ver todas las técnicas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techniques.map((technique) => (
            <TechniqueCard key={technique.id} technique={technique} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Home