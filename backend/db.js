const { Pool } = require('pg');

// Use as credenciais que você configurou no seu pgAdmin
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pharmaflow_db', // Nome do banco que você criou
  password: '4790',
  port: 5432,
});

module.exports = pool;