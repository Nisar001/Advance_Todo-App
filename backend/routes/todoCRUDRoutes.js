const express = require('express');
const {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoCRUDController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// CRUD routes
router.post('/', authMiddleware, createTodo);
router.get('/', authMiddleware, getAllTodos);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);

module.exports = router;
