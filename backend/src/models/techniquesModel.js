const { getPool } = require('../db')

// Datos mock de técnicas de dibujo (fallback si no hay BD configurada)
const mockTechniques = [
  {
    id: 1,
    name: 'Lápiz Grafito',
    description:
      'Técnica básica de dibujo usando lápices de grafito. Ideal para comenzar a dibujar con materiales accesibles.',
    materials:
      'Lápices de grafito (HB, 2B, 4B), papel bond o de dibujo, borrador',
    difficulty: 'Básico',
    image_url: '/images/lapiz-grafito.png'
  },
  {
    id: 2,
    name: 'Acuarela',
    description:
      'Técnica pictórica que utiliza pigmentos diluidos en agua. Permite crear efectos delicados y translúcidos.',
    materials: 'Pinturas acuarela, pinceles, papel acuarela, agua',
    difficulty: 'Intermedio',
    image_url: '/images/acuarela-basica.png'
  },
  {
    id: 3,
    name: 'Óleo',
    description:
      'Técnica de pintura con pigmentos mezclados con aceite. Produce obras duraderas con textura rica.',
    materials: 'Pinturas al óleo, pinceles, lienzos, diluyentes',
    difficulty: 'Avanzado',
    image_url: '/images/oleo-clasico.png'
  },
  {
    id: 4,
    name: 'Carboncillo',
    description:
      'Material de dibujo elaborado con carbón vegetal. Ideal para trabajos con sombras y contrastes.',
    materials: 'Barras de carboncillo, papel texturado, difuminador',
    difficulty: 'Intermedio',
    image_url: '/images/carboncillo-artistico.png'
  }
]

// Devuelve true si debemos usar la base de datos PostgreSQL
function shouldUseDatabase() {
  return process.env.USE_DB === 'true'
}

// Obtiene todas las técnicas, con soporte opcional de búsqueda y filtros
async function getAllTechniques({ search, difficulty }) {
  const useDb = shouldUseDatabase()
  const pool = useDb ? getPool() : null

  if (useDb && pool) {
    // Lógica con PostgreSQL
    const values = []
    let query =
      'SELECT id, name, description, materials, difficulty, image_url FROM techniques WHERE 1=1'

    if (search) {
      values.push(`%${search}%`)
      query += ` AND (LOWER(name) LIKE LOWER($${values.length}) OR LOWER(description) LIKE LOWER($${values.length}))`
    }

    if (difficulty) {
      values.push(difficulty)
      query += ` AND difficulty = $${values.length}`
    }

    query += ' ORDER BY id ASC'

    const result = await pool.query(query, values)
    return result.rows
  }

  // Fallback: filtro en memoria usando los datos mock
  let filtered = [...mockTechniques]

  if (search) {
    const term = search.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.materials.toLowerCase().includes(term)
    )
  }

  if (difficulty) {
    filtered = filtered.filter((t) => t.difficulty === difficulty)
  }

  return filtered
}

// Obtiene una técnica por ID
async function getTechniqueById(id) {
  const useDb = shouldUseDatabase()
  const pool = useDb ? getPool() : null

  if (useDb && pool) {
    const result = await pool.query(
      'SELECT id, name, description, materials, difficulty, image_url FROM techniques WHERE id = $1',
      [id]
    )
    return result.rows[0] || null
  }

  return mockTechniques.find((t) => t.id === id) || null
}

// Crea una nueva técnica (por ahora solo en memoria si no hay BD)
async function createTechnique(techniqueData) {
  const useDb = shouldUseDatabase()
  const pool = useDb ? getPool() : null

  if (useDb && pool) {
    // Aquí iría el INSERT real en PostgreSQL cuando se active la BD
    // Por ahora dejamos el diseño preparado pero sin implementación
    throw new Error('Creación en base de datos aún no implementada')
  }

  const ids = mockTechniques.map((t) => t.id)
  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1

  const newTechnique = {
    id: newId,
    name: techniqueData.name,
    description: techniqueData.description,
    materials: techniqueData.materials,
    difficulty: techniqueData.difficulty,
    image_url: techniqueData.image_url || ''
  }

  mockTechniques.push(newTechnique)
  return newTechnique
}

// Actualiza una técnica existente
async function updateTechnique(id, updates) {
  const useDb = shouldUseDatabase()
  const pool = useDb ? getPool() : null

  if (useDb && pool) {
    // Aquí iría el UPDATE real en PostgreSQL cuando se active la BD
    throw new Error('Actualización en base de datos aún no implementada')
  }

  const index = mockTechniques.findIndex((t) => t.id === id)
  if (index === -1) {
    return null
  }

  mockTechniques[index] = {
    ...mockTechniques[index],
    ...updates
  }

  return mockTechniques[index]
}

// Elimina una técnica existente
async function deleteTechnique(id) {
  const useDb = shouldUseDatabase()
  const pool = useDb ? getPool() : null

  if (useDb && pool) {
    // Aquí iría el DELETE real en PostgreSQL cuando se active la BD
    throw new Error('Eliminación en base de datos aún no implementada')
  }

  const index = mockTechniques.findIndex((t) => t.id === id)
  if (index === -1) {
    return false
  }

  mockTechniques.splice(index, 1)
  return true
}

module.exports = {
  getAllTechniques,
  getTechniqueById,
  createTechnique,
  updateTechnique,
  deleteTechnique
}


