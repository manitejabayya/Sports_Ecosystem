const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, profile } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse('User already exists', 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'athlete',
    profile: profile || {}
  });

  // Calculate BMI if physical stats provided
  if (profile?.physicalStats?.height && profile?.physicalStats?.weight) {
    user.calculateBMI();
    await user.save();
  }

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user details
// @route   PUT /api/auth/me
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Verify token
// @route   GET /api/auth/verify
// @access  Private
exports.verifyToken = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
      valid: true
    }
  });
});

// @desc    Get user stats for dashboard
// @route   GET /api/auth/stats
// @access  Private
exports.getUserStats = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  let stats = {};
  
  if (user.role === 'athlete') {
    stats = {
      fitnessScore: user.athleteData.fitnessScore || 0,
      totalGoals: user.athleteData.goals?.length || 0,
      completedGoals: user.athleteData.goals?.filter(g => g.status === 'completed').length || 0,
      totalBadges: user.athleteData.badges?.length || 0,
      trainingDays: user.athleteData.totalTrainingDays || 0,
      assessments: user.athleteData.totalAssessments || 0
    };
  } else if (user.role === 'coach') {
    stats = {
      totalAthletes: user.coachData.totalAthletes || 0,
      activeAthletes: user.coachData.athletes?.filter(a => a.status === 'active').length || 0,
      rating: user.coachData.rating || 0,
      experience: user.coachData.experience || 0
    };
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.profile.avatar
      },
      stats
    }
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
};