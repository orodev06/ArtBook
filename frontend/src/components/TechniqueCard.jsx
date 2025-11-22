import { Link } from 'react-router-dom'

function TechniqueCard({ technique }) {
  const difficultyColors = {
    'Básico': 'bg-green-100 text-green-800',
    'Intermedio': 'bg-yellow-100 text-yellow-800',
    'Avanzado': 'bg-red-100 text-red-800'
  }

  return (
    <Link to={`/technique/${technique.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer transform hover:-translate-y-1">
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
    </Link>
  )
}

export default TechniqueCard


