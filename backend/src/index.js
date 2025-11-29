const express = require('express')
const cors = require('cors')
require('dotenv').config()

const techniquesRoutes = require('./routes/techniquesRoutes')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Ruta raíz - estado de la API
app.get('/', (req, res) => {
  res.json({
    message: 'ArtBook API - Backend funcionando correctamente',
    version: '1.0.0',
    useDatabase: process.env.USE_DB === 'true'
  })
})

// Rutas de técnicas
app.use('/api/techniques', techniquesRoutes)

// Manejo básico de 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
  console.log(`📚 API disponible en http://localhost:${PORT}/api/techniques`)
})

