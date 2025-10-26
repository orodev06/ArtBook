import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000/api'

function App() {
  const [techniques, setTechniques] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTechniques()
  }, [])

  const fetchTechniques = async () => {
    try {
      const response = await fetch(`${API_URL}/techniques`)
      const data = await response.json()
      setTechniques(data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching techniques:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-purple-primary text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">ArtBook</h1>
          <p className="text-center mt-2 text-purple-light">Técnicas de Dibujo</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-purple-primary text-xl">Cargando técnicas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techniques.map((technique) => (
              <TechniqueCard key={technique.id} technique={technique} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>ArtBook - Proyecto de Desarrollo Web</p>
          <p className="text-sm mt-2">Versión 0.25 - Demo básica</p>
        </div>
      </footer>
    </div>
  )
}

function TechniqueCard({ technique }) {
  const difficultyColors = {
    'Básico': 'bg-green-100 text-green-800',
    'Intermedio': 'bg-yellow-100 text-yellow-800',
    'Avanzado': 'bg-red-100 text-red-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="h-48 bg-purple-light flex items-center justify-center">
        <span className="text-white text-lg font-semibold">{technique.name}</span>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-purple-primary mb-3">
          {technique.name}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {technique.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[technique.difficulty]}`}>
            {technique.difficulty}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Materiales:</span> {technique.materials}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App


