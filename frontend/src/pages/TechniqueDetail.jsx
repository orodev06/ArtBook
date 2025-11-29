import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_URL = 'http://localhost:3000/api'

function TechniqueDetail() {
  const { id } = useParams()
  const [technique, setTechnique] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTechnique()
  }, [id])

  const fetchTechnique = async () => {
    try {
      const response = await fetch(`${API_URL}/techniques/${id}`)
      const data = await response.json()
      
      if (data.success) {
        setTechnique(data.data)
      } else {
        setError('Técnica no encontrada')
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching technique:', error)
      setError('Error al cargar la técnica')
      setLoading(false)
    }
  }

  const difficultyColors = {
    'Básico': 'bg-green-100 text-green-800',
    'Intermedio': 'bg-yellow-100 text-yellow-800',
    'Avanzado': 'bg-red-100 text-red-800'
  }

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-primary mb-4"></div>
          <p className="text-purple-primary text-xl">Cargando técnica...</p>
        </div>
      </main>
    )
  }

  if (error || !technique) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 text-xl mb-4">{error || 'Técnica no encontrada'}</p>
          <Link 
            to="/" 
            className="inline-block bg-purple-primary text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Volver a la lista
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Botón volver */}
      <Link 
        to="/" 
        className="inline-flex items-center text-purple-primary hover:text-purple-600 mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a la lista
      </Link>

      {/* Contenido principal */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Imagen/Header */}
        {technique.image_url ? (
          <img
            src={technique.image_url}
            alt={`Ejemplo de ${technique.name}`}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="h-64 bg-purple-light flex items-center justify-center">
            <span className="text-white text-3xl font-bold">{technique.name}</span>
          </div>
        )}

        {/* Información */}
        <div className="p-8">
          {/* Título y dificultad */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-purple-primary">
              {technique.name}
            </h1>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${difficultyColors[technique.difficulty]}`}>
              {technique.difficulty}
            </span>
          </div>

          {/* Descripción */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descripción</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {technique.description}
            </p>
          </div>

          {/* Materiales */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Materiales necesarios</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 text-lg">
                {technique.materials}
              </p>
            </div>
          </div>

          {/* Botón volver */}
          <div className="pt-6 border-t border-gray-200">
            <Link 
              to="/" 
              className="inline-block bg-purple-primary text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
            >
              Ver todas las técnicas
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default TechniqueDetail


