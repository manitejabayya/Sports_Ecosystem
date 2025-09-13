const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }
  // Check for token in cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorResponse('No user found with this token', 401));
    }

    // Check if user is active
    if (!req.user.isActive) {
      return next(new ErrorResponse('User account is deactivated', 401));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

// Check if user is athlete
exports.isAthlete = (req, res, next) => {
  if (req.user.role !== 'athlete') {
    return next(new ErrorResponse('Access denied. Athlete role required', 403));
  }
  next();
};

// Check if user is coach
exports.isCoach = (req, res, next) => {
  if (req.user.role !== 'coach') {
    return next(new ErrorResponse('Access denied. Coach role required', 403));
  }
  next();
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorResponse('Access denied. Admin role required', 403));
  }
  next();
};

// Optional authentication - doesn't fail if no token
exports.optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } catch (err) {
      // Token invalid, but continue without user
      req.user = null;
    }
  }

  next();
});

// Rate limiting per user
exports.userRateLimit = (windowMs, max) => {
  const userRequests = new Map();

  return (req, res, next) => {
    if (!req.user) {
      return next();
    }

    const userId = req.user.id;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get or create user request history
    if (!userRequests.has(userId)) {
      userRequests.set(userId, []);
    }

    const requests = userRequests.get(userId);
    
    // Filter out old requests
    const validRequests = requests.filter(timestamp => timestamp > windowStart);
    userRequests.set(userId, validRequests);

    // Check if limit exceeded
    if (validRequests.length >= max) {
      return next(new ErrorResponse('Too many requests, please try again later', 429));
    }

    // Add current request
    validRequests.push(now);

    next();
  };
};