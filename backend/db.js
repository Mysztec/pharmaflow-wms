const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'pharmaflow_db',
  host: process.env.DB_HOST || 'db', // No K8s, será o nome do Service do Postgres
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;