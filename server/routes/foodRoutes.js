const express = require('express');
const router = express.Router();
const { addFoodEntry, getDailySummary, deleteFoodEntry } = require('../controllers/foodController');
const protect = require('../middleware/authMiddleware');


router.post('/add', protect, addFoodEntry);
router.get('/summary', protect,getDailySummary);
router.delete('/:id', protect, deleteFoodEntry);

module.exports = router;
