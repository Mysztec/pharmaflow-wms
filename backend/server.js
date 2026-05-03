const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Rota de Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT id, nome, email FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro no banco de dados.' });
  }
});

// NOVA: Rota de Cadastro (Signup)
app.post('/signup', async (req, res) => {
  const { nome, email, password } = req.body;
  try {
    const userExists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Este e-mail já está cadastrado.' });
    }

    await pool.query(
      'INSERT INTO users (nome, email, password) VALUES ($1, $2, $3)',
      [nome, email, password]
    );
    res.status(201).json({ success: true, message: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário.' });
  }
});

app.listen(3001, () => console.log("🚀 Backend PharmaFlow na porta 3001"));