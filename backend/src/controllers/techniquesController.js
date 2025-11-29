const {
  getAllTechniques,
  getTechniqueById,
  createTechnique,
  updateTechnique,
  deleteTechnique
} = require('../models/techniquesModel')

// GET /api/techniques
async function getTechniques(req, res) {
  try {
    const { search, difficulty } = req.query

    const techniques = await getAllTechniques({
      search: search || '',
      difficulty: difficulty || ''
    })

    res.json({
      success: true,
      data: techniques,
      count: techniques.length
    })
  } catch (error) {
    console.error('Error al obtener técnicas:', error)
    res.status(500).json({
      success: false,
      message: 'Error al obtener las técnicas'
    })
  }
}

// GET /api/techniques/:id
async function getTechnique(req, res) {
  try {
    const id = parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      })
    }

    const technique = await getTechniqueById(id)

    if (!technique) {
      return res.status(404).json({
        success: false,
        message: 'Técnica no encontrada'
      })
    }

    res.json({
      success: true,
      data: technique
    })
  } catch (error) {
    console.error('Error al obtener técnica:', error)
    res.status(500).json({
      success: false,
      message: 'Error al obtener la técnica'
    })
  }
}

// Validación básica de datos de técnica
function validateTechniqueBody(body) {
  const errors = []

  if (!body.name || typeof body.name !== 'string') {
    errors.push('El nombre es obligatorio')
  }

  if (!body.description || typeof body.description !== 'string') {
    errors.push('La descripción es obligatoria')
  }

  if (!body.materials || typeof body.materials !== 'string') {
    errors.push('Los materiales son obligatorios')
  }

  const validDifficulties = ['Básico', 'Intermedio', 'Avanzado']
  if (!body.difficulty || !validDifficulties.includes(body.difficulty)) {
    errors.push(
      'La dificultad debe ser una de: Básico, Intermedio, Avanzado'
    )
  }

  return errors
}

// POST /api/techniques
async function createTechniqueHandler(req, res) {
  try {
    const errors = validateTechniqueBody(req.body || {})

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Datos inválidos',
        errors
      })
    }

    const newTechnique = await createTechnique(req.body)

    res.status(201).json({
      success: true,
      data: newTechnique
    })
  } catch (error) {
    console.error('Error al crear técnica:', error)
    res.status(500).json({
      success: false,
      message:
        error.message || 'Error al crear la técnica (BD no implementada)'
    })
  }
}

// PUT /api/techniques/:id
async function updateTechniqueHandler(req, res) {
  try {
    const id = parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      })
    }

    const errors = validateTechniqueBody(req.body || {})

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Datos inválidos',
        errors
      })
    }

    const updated = await updateTechnique(id, req.body)

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Técnica no encontrada'
      })
    }

    res.json({
      success: true,
      data: updated
    })
  } catch (error) {
    console.error('Error al actualizar técnica:', error)
    res.status(500).json({
      success: false,
      message:
        error.message || 'Error al actualizar la técnica (BD no implementada)'
    })
  }
}

// DELETE /api/techniques/:id
async function deleteTechniqueHandler(req, res) {
  try {
    const id = parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      })
    }

    const deleted = await deleteTechnique(id)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Técnica no encontrada'
      })
    }

    res.json({
      success: true,
      message: 'Técnica eliminada correctamente'
    })
  } catch (error) {
    console.error('Error al eliminar técnica:', error)
    res.status(500).json({
      success: false,
      message:
        error.message || 'Error al eliminar la técnica (BD no implementada)'
    })
  }
}

module.exports = {
  getTechniques,
  getTechnique,
  createTechniqueHandler,
  updateTechniqueHandler,
  deleteTechniqueHandler
}


