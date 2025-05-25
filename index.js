const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const API_KEY = '123@';

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
});

let tasks = [];
let goals = [];

app.get('/getTasks', (req, res) => {
  res.status(200).json(tasks);
});

app.get('/getGoals', (req, res) => {
  res.status(200).json(goals);
});

app.post('/addTask', (req, res) => {
  const task = req.body;
  if (!task || !task.name || !task.description || !task.dueDate) {
    return res.status(400).json({ message: 'Bad Request: Invalid task data' });
  }
  tasks.push(task);
  res.status(200).json({ message: 'Task added', task });
});

app.post('/addGoal', (req, res) => {
  const goal = req.body;
  if (!goal || !goal.name || !goal.description || !goal.dueDate) {
    return res.status(400).json({ message: 'Bad Request: Invalid goal data' });
  }
  goals.push(goal);
  res.status(200).json({ message: 'Goal added', goal });
});

app.delete('/removeTask', (req, res) => {
  const { index } = req.body;
  if (index === undefined || index < 0 || index >= tasks.length) {
    return res.status(400).json({ message: 'Bad Request: Invalid task index' });
  }
  const removed = tasks.splice(index, 1);
  res.status(200).json({ message: 'Task removed', removed });
});

app.delete('/removeGoal', (req, res) => {
  const { index } = req.body;
  if (index === undefined || index < 0 || index >= goals.length) {
    return res.status(400).json({ message: 'Bad Request: Invalid goal index' });
  }
  const removed = goals.splice(index, 1);
  res.status(200).json({ message: 'Goal removed', removed });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
