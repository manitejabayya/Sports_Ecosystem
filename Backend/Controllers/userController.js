const User = require('../models/User');
const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const geoCoder = require('../utils/geoCoder');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  // Update profile fields
  const allowedFields = [
    'profile.avatar',
    'profile.dateOfBirth',
    'profile.gender',
    'profile.phone',
    'profile.location',
    'profile.sports',
    'profile.physicalStats',
    'profile.emergencyContact'
  ];

  // Deep merge profile data
  if (req.body.profile) {
    user.profile = { ...user.profile, ...req.body.profile };
  }

  // Calculate BMI if physical stats updated
  if (req.body.profile?.physicalStats) {
    user.calculateBMI();
  }

  await user.save();

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get athlete dashboard data
// @route   GET /api/users/athlete-dashboard
// @access  Private
exports.getAthleteDashboard = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (user.role !== 'athlete') {
    return next(new ErrorResponse('Access denied. Athlete role required', 403));
  }

  // Get recent performance data
  const recentSessions = user.athleteData.trainingSessions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  // Calculate goal progress
  const activeGoals = user.athleteData.goals.filter(g => g.status === 'active');
  const goalProgress = activeGoals.map(goal => ({
    ...goal.toObject(),
    progress: goal.targetValue ? (goal.currentValue / goal.targetValue) * 100 : 0
  }));

  // Get recent achievements
  const recentBadges = user.athleteData.badges
    .sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt))
    .slice(0, 5);

  const dashboardData = {
    stats: {
      fitnessScore: user.athleteData.fitnessScore,
      totalGoals: user.athleteData.goals.length,
      activeGoals: activeGoals.length,
      completedGoals: user.athleteData.goals.filter(g => g.status === 'completed').length,
      totalBadges: user.athleteData.badges.length,
      trainingDays: user.athleteData.totalTrainingDays,
      thisMonthSessions: user.athleteData.trainingSessions.filter(
        s => new Date(s.date).getMonth() === new Date().getMonth()
      ).length
    },
    recentSessions,
    goalProgress,
    recentBadges,
    performanceLevel: user.athleteData.performanceLevel
  };

  res.status(200).json({
    success: true,
    data: dashboardData
  });
});

// @desc    Get coach dashboard data
// @route   GET /api/users/coach-dashboard
// @access  Private
exports.getCoachDashboard = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('coachData.athletes.athleteId', 'name profile.avatar athleteData.fitnessScore');
  
  if (user.role !== 'coach') {
    return next(new ErrorResponse('Access denied. Coach role required', 403));
  }

  // Get active athletes with their latest performance
  const activeAthletes = user.coachData.athletes
    .filter(a => a.status === 'active')
    .map(athlete => ({
      id: athlete.athleteId._id,
      name: athlete.athleteId.name,
      avatar: athlete.athleteId.profile?.avatar,
      fitnessScore: athlete.athleteId.athleteData?.fitnessScore || 0,
      assignedAt: athlete.assignedAt
    }));

  const dashboardData = {
    stats: {
      totalAthletes: user.coachData.totalAthletes,
      activeAthletes: activeAthletes.length,
      rating: user.coachData.rating,
      experience: user.coachData.experience
    },
    activeAthletes,
    certification: user.coachData.certification,
    specialization: user.coachData.specialization
  };

  res.status(200).json({
    success: true,
    data: dashboardData
  });
});

// @desc    Add training session
// @route   POST /api/users/training-session
// @access  Private
exports.addTrainingSession = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (user.role !== 'athlete') {
    return next(new ErrorResponse('Access denied. Athlete role required', 403));
  }

  const sessionData = {
    date: req.body.date || new Date(),
    duration: req.body.duration,
    sport: req.body.sport,
    intensity: req.body.intensity,
    notes: req.body.notes,
    performanceMetrics: req.body.performanceMetrics || {}
  };

  user.athleteData.trainingSessions.push(sessionData);
  user.athleteData.totalTrainingDays += 1;

  await user.save();

  // Create notification
  await Notification.createNotification({
    recipient: user._id,
    title: 'Training Session Logged',
    message: `Successfully logged ${req.body.duration} minutes of ${req.body.sport} training`,
    type: 'performance_update',
    priority: 'low'
  });

  res.status(201).json({
    success: true,
    data: sessionData
  });
});

// @desc    Update goal progress
// @route   PUT /api/users/goals/:goalId
// @access  Private
exports.updateGoal = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (user.role !== 'athlete') {
    return next(new ErrorResponse('Access denied. Athlete role required', 403));
  }

  const goal = user.athleteData.goals.id(req.params.goalId);
  if (!goal) {
    return next(new ErrorResponse('Goal not found', 404));
  }

  // Update goal fields
  Object.keys(req.body).forEach(key => {
    if (key in goal) {
      goal[key] = req.body[key];
    }
  });

  // Check if goal is completed
  if (goal.currentValue >= goal.targetValue && goal.status !== 'completed') {
    goal.status = 'completed';
    
    // Award badge for goal completion
    user.athleteData.badges.push({
      name: 'Goal Achiever',
      description: `Completed goal: ${goal.title}`,
      icon: 'trophy',
      earnedAt: new Date()
    });

    // Create achievement notification
    await Notification.createNotification({
      recipient: user._id,
      title: 'Goal Completed! 🏆',
      message: `Congratulations! You've achieved your goal: ${goal.title}`,
      type: 'goal_achievement',
      priority: 'high'
    });
  }

  await user.save();

  res.status(200).json({
    success: true,
    data: goal
  });
});

// @desc    Add new goal
// @route   POST /api/users/goals
// @access  Private
exports.addGoal = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (user.role !== 'athlete') {
    return next(new ErrorResponse('Access denied. Athlete role required', 403));
  }

  const goalData = {
    title: req.body.title,
    description: req.body.description,
    targetValue: req.body.targetValue,
    unit: req.body.unit,
    deadline: req.body.deadline,
    status: 'active'
  };

  user.athleteData.goals.push(goalData);
  await user.save();

  res.status(201).json({
    success: true,
    data: goalData
  });
});

// @desc    Get user notifications
// @route   GET /api/users/notifications
// @access  Private
exports.getNotifications = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const notifications = await Notification.find({ recipient: req.user.id })
    .populate('sender', 'name profile.avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Notification.countDocuments({ recipient: req.user.id });
  const unreadCount = await Notification.countDocuments({ 
    recipient: req.user.id, 
    read: false 
  });

  res.status(200).json({
    success: true,
    data: {
      notifications,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: notifications.length,
        totalCount: total
      },
      unreadCount
    }
  });
});

// @desc    Mark notification as read
// @route   PUT /api/users/notifications/:id/read
// @access  Private
exports.markNotificationAsRead = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    recipient: req.user.id
  });

  if (!notification) {
    return next(new ErrorResponse('Notification not found', 404));
  }

  await notification.markAsRead();

  res.status(200).json({
    success: true,
    data: notification
  });
});

// @desc    Mark all notifications as read
// @route   PUT /api/users/notifications/mark-all-read
// @access  Private
exports.markAllNotificationsAsRead = asyncHandler(async (req, res, next) => {
  await Notification.updateMany(
    { recipient: req.user.id, read: false },
    { read: true, readAt: new Date() }
  );

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read'
  });
});

// @desc    Update user settings
// @route   PUT /api/users/settings
// @access  Private
exports.updateSettings = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (req.body.settings) {
    user.settings = { ...user.settings, ...req.body.settings };
  }

  await user.save();

  res.status(200).json({
    success: true,
    data: user.settings
  });
});

// @desc    Search users
// @route   GET /api/users/search
// @access  Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const { query, role, location, sport } = req.query;
  
  let searchCriteria = {};
  
  if (query) {
    searchCriteria.$or = [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ];
  }
  
  if (role) {
    searchCriteria.role = role;
  }
  
  if (location) {
    searchCriteria['profile.location.city'] = { $regex: location, $options: 'i' };
  }
  
  if (sport) {
    searchCriteria['profile.sports.sportName'] = { $regex: sport, $options: 'i' };
  }

  const users = await User.find(searchCriteria)
    .select('name email role profile.avatar profile.location profile.sports')
    .limit(20);

  res.status(200).json({
    success: true,
    data: users
  });
});

// @desc    Get performance analytics
// @route   GET /api/users/analytics
// @access  Private
exports.getPerformanceAnalytics = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (user.role !== 'athlete') {
    return next(new ErrorResponse('Access denied. Athlete role required', 403));
  }

  const sessions = user.athleteData.trainingSessions;
  
  // Group sessions by month for chart data
  const monthlyData = {};
  sessions.forEach(session => {
    const month = new Date(session.date).toISOString().slice(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        sessions: 0,
        totalDuration: 0,
        avgIntensity: 0
      };
    }
    monthlyData[month].sessions += 1;
    monthlyData[month].totalDuration += session.duration || 0;
  });

  // Convert to array and sort by month
  const chartData = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6); // Last 6 months

  // Calculate trends
  const trends = {
    fitnessScoreChange: calculateTrend(user.athleteData.fitnessScore, 85), // Compare with previous
    sessionFrequency: sessions.length > 0 ? 'increasing' : 'stable',
    goalCompletionRate: user.athleteData.goals.length > 0 
      ? (user.athleteData.goals.filter(g => g.status === 'completed').length / user.athleteData.goals.length) * 100 
      : 0
  };

  res.status(200).json({
    success: true,
    data: {
      chartData,
      trends,
      totalSessions: sessions.length,
      totalDuration: sessions.reduce((sum, s) => sum + (s.duration || 0), 0),
      currentStreak: calculateTrainingStreak(sessions)
    }
  });
});

// Helper function to calculate trend
function calculateTrend(current, previous) {
  if (!previous) return 'stable';
  const change = ((current - previous) / previous) * 100;
  if (change > 5) return 'increasing';
  if (change < -5) return 'decreasing';
  return 'stable';
}

// Helper function to calculate training streak
function calculateTrainingStreak(sessions) {
  if (sessions.length === 0) return 0;
  
  const sortedSessions = sessions.sort((a, b) => new Date(b.date) - new Date(a.date));
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (let session of sortedSessions) {
    const sessionDate = new Date(session.date);
    sessionDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((currentDate - sessionDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= streak + 1) {
      streak++;
      currentDate = sessionDate;
    } else {
      break;
    }
  }
  
  return streak;
}