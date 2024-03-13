const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoals, deleteGoals } = require('../controllers/goaslController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, setGoal)
router.get('/', protect, getGoals)
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals)


module.exports = router