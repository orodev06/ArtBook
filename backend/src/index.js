const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Datos mock de técnicas de dibujo
const techniques = [
  {
    id: 1,
    name: "Lápiz Grafito",
    description: "Técnica básica de dibujo usando lápices de grafito. Ideal para comenzar a dibujar con materiales accesibles.",
    materials: "Lápices de grafito (HB, 2B, 4B), papel bond o de dibujo, borrador",
    difficulty: "Básico",
    image_url: "https://via.placeholder.com/300x200?text=Lapiz+Grafito"
  },
  {
    id: 2,
    name: "Acuarela",
    description: "Técnica pictórica que utiliza pigmentos diluidos en agua. Permite crear efectos delicados y translúcidos.",
    materials: "Pinturas acuarela, pinceles, papel acuarela, agua",
    difficulty: "Intermedio",
    image_url: "https://via.placeholder.com/300x200?text=Acuarela"
  },
  {
    id: 3,
    name: "Óleo",
    description: "Técnica de pintura con pigmentos mezclados con aceite. Produce obras duraderas con textura rica.",
    materials: "Pinturas al óleo, pinceles, lienzos, diluyentes",
    difficulty: "Avanzado",
    image_url: "https://via.placeholder.com/300x200?text=Oleo"
  },
  {
    id: 4,
    name: "Carboncillo",
    description: "Material de dibujo elaborado con carbón vegetal. Ideal para trabajos con sombras y contrastes.",
    materials: "Barras de carboncillo, papel texturado, difuminador",
    difficulty: "Intermedio",
    image_url: "https://via.placeholder.com/300x200?text=Carboncillo"
  }
];

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    message: 'ArtBook API - Backend funcionando correctamente',
    version: '1.0.0'
  });
});

// GET /api/techniques - Obtener todas las técnicas
app.get('/api/techniques', (req, res) => {
  res.json({
    success: true,
    data: techniques,
    count: techniques.length
  });
});

// GET /api/techniques/:id - Obtener una técnica por ID
app.get('/api/techniques/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const technique = techniques.find(t => t.id === id);
  
  if (!technique) {
    return res.status(404).json({
      success: false,
      message: 'Técnica no encontrada'
    });
  }
  
  res.json({
    success: true,
    data: technique
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 API disponible en http://localhost:${PORT}/api/techniques`);
});


