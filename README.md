# ArtBook Project

Proyecto web educativo para mostrar técnicas de dibujo.

## Estructura del Proyecto

```
ArtBook/
├── backend/    # API con Node.js y Express
└── frontend/   # Interfaz con React, Vite y Tailwind
```

## Estado del Proyecto

**60% Completado** - Versión con navegación, detalles, búsqueda y filtros

### ✅ Implementado
- Estructura base del proyecto (backend/ y frontend/)
- Backend con Express y datos mock
- API REST con endpoints básicos
- Capas en backend: `routes`, `controllers`, `models`
- Soporte para búsqueda y filtros en `/api/techniques`
- Frontend con React + Vite + Tailwind CSS
- Diseño responsivo con paleta morada (#7C3AED)
- Lista de técnicas con tarjetas informativas
- Indicadores de dificultad (Básico, Intermedio, Avanzado)
- **React Router configurado** - Navegación entre páginas
- **Componentes separados** - Header, TechniqueCard, Footer
- **Página de detalles** - Vista completa de cada técnica
- **Barra de búsqueda y filtro por dificultad** en Home
- **Manejo de errores y estados de carga** en el frontend
- Carpeta de imágenes en `frontend/public/images` con nombres definidos

### ⏳ Pendiente
- Integración real con PostgreSQL (`USE_DB=true`)
- CRUD completo (POST, PUT, DELETE)
- Paginación
- Mejoras visuales adicionales y animaciones

## Instalación

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Tecnologías

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Base de datos**: PostgreSQL (por implementar)

## Autor

Usuario: orodev06

