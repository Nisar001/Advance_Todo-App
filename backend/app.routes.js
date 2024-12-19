const express = require('express');
const bodyParser = require('body-parser');
const todoCRUDroutes = require('./routes/todoCRUDRoutes');
const todoHistoryRoutes = require('./routes/todoHistoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/todos', todoCRUDroutes);
app.use('/api/todo-history', todoHistoryRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
