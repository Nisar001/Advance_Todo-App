const express = require('express');
const {
  getPreviousTodos,
  deletePreviousTodos,
} = require('../controllers/todoHistoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// History routes
router.get('/previous', authMiddleware, getPreviousTodos);
router.delete('/previous', authMiddleware, deletePreviousTodos);

module.exports = router;
