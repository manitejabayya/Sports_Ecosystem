const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  verifyToken,
  getUserStats
} = require('../Controllers/authController');

const { protect } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.use(protect); 

router.get('/me', getMe);
router.put('/me', updateDetails);
router.put('/updatepassword', updatePassword);
router.get('/logout', logout);
router.get('/verify', verifyToken);
router.get('/stats', getUserStats);

module.exports = router;