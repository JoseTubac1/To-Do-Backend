const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  if (req.headers.authorization !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
});

app.get('/getTasks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks');
    res.status(200).json(rows);
  } catch {
    res.sendStatus(500);
  }
});

app.get('/getGoals', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM goals');
    res.status(200).json(rows);
  } catch {
    res.sendStatus(500);
  }
});

app.post('/addTask', async (req, res) => {
  const { name, description, dueDate } = req.body;
  if (!name || !description || !dueDate) {
    return res.status(400).json({ message: 'Bad Request' });
  }
  try {
    const [result] = await pool.query('INSERT INTO tasks (name, description, dueDate) VALUES (?, ?, ?)', [name, description, dueDate]);
    res.status(200).json({ id: result.insertId });
  } catch {
    res.sendStatus(500);
  }
});

app.post('/addGoal', async (req, res) => {
  const { name, description, dueDate } = req.body;
  if (!name || !description || !dueDate) {
    return res.status(400).json({ message: 'Bad Request' });
  }
  try {
    const [result] = await pool.query('INSERT INTO goals (name, description, dueDate) VALUES (?, ?, ?)', [name, description, dueDate]);
    res.status(200).json({ id: result.insertId });
  } catch {
    res.sendStatus(500);
  }
});

app.delete('/removeTask', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Bad Request' });
  }
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.status(200).json({ deleted: result.affectedRows });
  } catch {
    res.sendStatus(500);
  }
});

app.delete('/removeGoal', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Bad Request' });
  }
  try {
    const [result] = await pool.query('DELETE FROM goals WHERE id = ?', [id]);
    res.status(200).json({ deleted: result.affectedRows });
  } catch {
    res.sendStatus(500);
  }
});

app.listen(PORT, async () => {
  try {
    await pool.getConnection();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch {
    console.error('Error al conectar con la base de datos');
    process.exit(1);
  }
});
