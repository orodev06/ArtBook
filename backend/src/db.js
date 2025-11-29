const { Pool } = require('pg')

// Crea y exporta un Pool de PostgreSQL solo si hay configuración disponible
// Esto permite que el backend siga funcionando con datos mock si no hay BD.

let pool = null

function getPool() {
  if (pool) return pool

  const hasDatabaseUrl = !!process.env.DATABASE_URL
  const hasBasicConfig =
    process.env.PGHOST && process.env.PGUSER && process.env.PGDATABASE

  if (!hasDatabaseUrl && !hasBasicConfig) {
    // No hay configuración de BD, devolvemos null para que el modelo use datos mock
    return null
  }

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.PGSSL === 'true'
        ? { rejectUnauthorized: false }
        : undefined
  })

  return pool
}

module.exports = {
  getPool
}


