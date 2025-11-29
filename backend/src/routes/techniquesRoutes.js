const express = require('express')
const {
  getTechniques,
  getTechnique,
  createTechniqueHandler,
  updateTechniqueHandler,
  deleteTechniqueHandler
} = require('../controllers/techniquesController')

const router = express.Router()

// /api/techniques
router.get('/', getTechniques)
router.post('/', createTechniqueHandler)

// /api/techniques/:id
router.get('/:id', getTechnique)
router.put('/:id', updateTechniqueHandler)
router.delete('/:id', deleteTechniqueHandler)

module.exports = router


