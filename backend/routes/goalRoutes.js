const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoals, deleteGoal } = require('../controllers/goaslController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, setGoal)
router.get('/', protect, getGoals)
router.delete('/:id',protect, deleteGoal)


module.exports = router