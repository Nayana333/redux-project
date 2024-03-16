const expres = require('express');
const router = expres.Router();
const { registerUser, getMe, loginUser, profileUpload } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/profile/upload', (req, res,next) => {
    console.log(req.body);
    next()
}, protect, profileUpload);

module.exports = router;
