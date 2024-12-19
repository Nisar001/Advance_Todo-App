const { Todo } = require('../models');
const { Op } = require('sequelize');

// Fetch todos for a specific date
exports.getPreviousTodos = async (req, res) => {
  const userId = req.user.id;
  const { date } = req.query; // Expecting "YYYY-MM-DD" format

  try {
    const todos = await Todo.findAll({
      where: {
        userId,
        createdAt: {
          [Op.lt]: new Date(date + ' 23:59:59'),
        },
      },
    });

    if (!todos.length) {
      return res.status(404).json({ message: 'No todos found for the specified date' });
    }

    return res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Delete todos for a specific date
exports.deletePreviousTodos = async (req, res) => {
  const userId = req.user.id;
  const { date } = req.query; // Expecting "YYYY-MM-DD" format

  try {
    const deletedCount = await Todo.destroy({
      where: {
        userId,
        createdAt: {
          [Op.lt]: new Date(date + ' 23:59:59'),
        },
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'No todos found to delete for the specified date' });
    }

    return res.status(200).json({ message: `${deletedCount} todos deleted successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
