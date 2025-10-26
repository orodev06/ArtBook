# Estructura del Backend

## Organización Actual (Básica)

```
backend/
├── src/
│   └── index.js          # Servidor principal con todas las rutas
├── package.json           # Dependencias
├── .env                   # Variables de entorno (PORT=3000)
├── .gitignore            # Archivos a ignorar
└── README.md             # Documentación
```

## Próximos Pasos

Para completar el backend, sería necesario:

### 1. Separar en carpetas
```
backend/
├── src/
│   ├── controllers/      # Lógica de negocio
│   ├── models/          # Modelos de datos
│   ├── routes/          # Definición de rutas
│   └── database/        # Conexión a PostgreSQL
└── index.js
```

### 2. Implementar PostgreSQL
- Archivo de conexión a la base de datos
- Modelo de `techniques`
- Queries SQL

### 3. Agregar más endpoints
- POST /api/techniques (crear)
- PUT /api/techniques/:id (actualizar)
- DELETE /api/techniques/:id (eliminar)

### 4. Mejoras
- Validación de datos
- Manejo de errores mejorado
- Logging
- Documentación con Swagger


