const { Pool } = require('pg');

const pool = new Pool({
  user: 'user',        // Usuário definido no Docker
  password: 'password', // Senha definida no Docker
  database: 'pharmaflow_db',
  host: 'db',          // O nome do contêiner na rede do Docker
  port: 5432,
});

module.exports = pool;