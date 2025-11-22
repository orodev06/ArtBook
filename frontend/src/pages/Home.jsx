import { useState, useEffect } from 'react'
import TechniqueCard from '../components/TechniqueCard'

const API_URL = 'http://localhost:3000/api'

function Home() {
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
    <main className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-primary mb-4"></div>
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
  )
}

export default Home


