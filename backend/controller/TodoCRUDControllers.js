const { Todo } = require('../models');

// Create a new todo
exports.createTodo = async (req, res) => {
  const { name, description, timeEstimate, pinned } = req.body;
  const userId = req.user.id;

  try {
    const newTodo = await Todo.create({
      name,
      description,
      timeEstimate,
      pinned,
      userId,
    });

    return res.status(201).json({ todo: newTodo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch all todos for the logged-in user
exports.getAllTodos = async (req, res) => {
  const userId = req.user.id;

  try {
    const todos = await Todo.findAll({ where: { userId } });
    return res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Update an existing todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { name, description, timeEstimate, status, pinned } = req.body;
  const userId = req.user.id;

  try {
    const todo = await Todo.findOne({ where: { id, userId } });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.name = name || todo.name;
    todo.description = description || todo.description;
    todo.timeEstimate = timeEstimate || todo.timeEstimate;
    todo.status = status || todo.status;
    todo.pinned = pinned || todo.pinned;

    await todo.save();
    return res.status(200).json({ todo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const todo = await Todo.findOne({ where: { id, userId } });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.destroy();
    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
