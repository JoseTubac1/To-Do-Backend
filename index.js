const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Tu API key
const API_KEY = '123@'; 

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
  }
  next();
});

let tasks = [];
let goals = [];

app.get('/getTasks', (req, res) => {
  res.json(tasks);
});

app.get('/getGoals', (req, res) => {
  res.json(goals);
});


app.post('/addTask', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json({ message: 'Task added', task });
});

app.post('/addGoal', (req, res) => {
  const goal = req.body;
  goals.push(goal);
  res.status(201).json({ message: 'Goal added', goal });
});

app.delete('/removeTask', (req, res) => {
  const { index } = req.body;
  if (tasks[index]) {
    const removed = tasks.splice(index, 1);
    res.json({ message: 'Task removed', removed });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/removeGoal', (req, res) => {
  const { index } = req.body;
  if (goals[index]) {
    const removed = goals.splice(index, 1);
    res.json({ message: 'Goal removed', removed });
  } else {
    res.status(404).json({ message: 'Goal not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
