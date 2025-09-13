const express = require('express');
const {
  getProfile,
  updateProfile,
  getAthleteDashboard,
  getCoachDashboard,
  addTrainingSession,
  updateGoal,
  addGoal,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  updateSettings,
  searchUsers,
  getPerformanceAnalytics
} = require('../Controllers/userController');

const { protect, isAthlete, isCoach, userRateLimit } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');
const User = require('../models/User');
const Notification = require('../models/Notification');

const router = express.Router();

// All routes are protected
router.use(protect);

// Profile routes
router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

// Dashboard routes
router.get('/athlete-dashboard', isAthlete, getAthleteDashboard);
router.get('/coach-dashboard', isCoach, getCoachDashboard);

// Training and goals (athletes only)
router.post('/training-session', isAthlete, addTrainingSession);
router.route('/goals')
  .post(isAthlete, addGoal);
router.put('/goals/:goalId', isAthlete, updateGoal);

// Analytics
router.get('/analytics', isAthlete, getPerformanceAnalytics);

// Notifications
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationAsRead);
router.put('/notifications/mark-all-read', markAllNotificationsAsRead);

// Settings
router.put('/settings', updateSettings);

// Search (with rate limiting)
router.get('/search', userRateLimit(60000, 10), searchUsers);

module.exports = router;