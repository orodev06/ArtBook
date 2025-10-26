# Instrucciones de Instalación - ArtBook

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Editor de código (VS Code recomendado)

## Instalación Paso a Paso

### 1. Clonar o Descargar el Proyecto

```bash
# Si ya tienes Git
git clone <tu-repositorio>
cd ArtBookProject
```

### 2. Configurar el Backend

```bash
# Ir a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env (si no existe)
# Copia el contenido:
echo "PORT=3000" > .env

# Iniciar servidor de desarrollo
npm run dev
```

El backend estará corriendo en: `http://localhost:3000`

### 3. Configurar el Frontend

Abre una **nueva terminal** (deja el backend corriendo):

```bash
# Ir a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará corriendo en: `http://localhost:5173`

## Verificación

1. Abre tu navegador en: `http://localhost:5173`
2. Deberías ver una lista de 4 técnicas de dibujo
3. Las tarjetas deben mostrar información de cada técnica

## Estructura del Proyecto

```
ArtBookProject/
├── backend/
│   ├── src/
│   │   └── index.js       # Servidor Express
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── App.jsx        # Componente principal
    │   ├── main.jsx       # Punto de entrada
    │   └── index.css      # Estilos con Tailwind
    ├── package.json
    └── vite.config.js
```

## Comandos Útiles

### Backend
- `npm run dev` - Servidor de desarrollo (con nodemon)
- `npm start` - Servidor de producción

### Frontend
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Vista previa del build

## Problemas Comunes

### Error: Puerto 3000 en uso
```bash
# Cambia el puerto en backend/.env
PORT=3001
```

### Error: Cannot find module
```bash
# Elimina node_modules y reinstala
rm -rf node_modules
npm install
```

### CORS Error en el navegador
- Asegúrate de que el backend esté corriendo
- Verifica que la URL del backend sea correcta

## Estado del Proyecto

Esta es la **versión básica (25%)** que incluye:
- ✅ Backend con datos mock
- ✅ Frontend con lista de técnicas
- ✅ Diseño responsivo básico
- ✅ Paleta morada y blanca

Pendiente de implementar:
- ⏳ Base de datos PostgreSQL
- ⏳ Sistema de búsqueda
- ⏳ Página de detalles
- ⏳ CRUD completo


