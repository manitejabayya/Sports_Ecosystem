const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['athlete', 'coach', 'admin', 'scout'],
    default: 'athlete'
  },
  profile: {
    avatar: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    phone: String,
    location: {
      city: String,
      state: String,
      country: { type: String, default: 'India' },
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    sports: [{
      sportName: String,
      category: String,
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'professional'],
        default: 'beginner'
      },
      experience: Number, // years
      achievements: [String]
    }],
    physicalStats: {
      height: Number, // cm
      weight: Number, // kg
      bmi: Number
    },
    emergencyContact: {
      name: String,
      relation: String,
      phone: String
    }
  },
  athleteData: {
    fitnessScore: { type: Number, default: 0 },
    performanceLevel: { type: Number, default: 1 },
    totalTrainingDays: { type: Number, default: 0 },
    totalAssessments: { type: Number, default: 0 },
    badges: [{
      name: String,
      description: String,
      earnedAt: { type: Date, default: Date.now },
      icon: String
    }],
    goals: [{
      title: String,
      description: String,
      targetValue: Number,
      currentValue: { type: Number, default: 0 },
      unit: String,
      deadline: Date,
      status: {
        type: String,
        enum: ['active', 'completed', 'paused', 'failed'],
        default: 'active'
      },
      createdAt: { type: Date, default: Date.now }
    }],
    trainingSessions: [{
      date: { type: Date, default: Date.now },
      duration: Number, // minutes
      sport: String,
      intensity: {
        type: String,
        enum: ['low', 'medium', 'high']
      },
      notes: String,
      performanceMetrics: mongoose.Schema.Types.Mixed
    }]
  },
  coachData: {
    certification: [String],
    specialization: [String],
    experience: Number, // years
    rating: { type: Number, default: 0 },
    totalAthletes: { type: Number, default: 0 },
    athletes: [{
      athleteId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      assignedAt: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ['active', 'inactive', 'completed'],
        default: 'active'
      }
    }]
  },
  notifications: [{
    title: String,
    message: String,
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'error']
    },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  settings: {
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'private', 'friends'],
        default: 'public'
      },
      sharePerformanceData: { type: Boolean, default: true },
      allowCoachRequests: { type: Boolean, default: true }
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      trainingReminders: { type: Boolean, default: true },
      performanceUpdates: { type: Boolean, default: true },
      communityActivity: { type: Boolean, default: true }
    }
  },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  // Interpret JWT_COOKIE_EXPIRE as days if it's a number (e.g., 30 => '30d')
  const rawExpire = process.env.JWT_COOKIE_EXPIRE;
  const expiresIn = /\d+$/.test(String(rawExpire)) ? `${rawExpire}d` : rawExpire;
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Calculate BMI
UserSchema.methods.calculateBMI = function() {
  if (this.profile.physicalStats.height && this.profile.physicalStats.weight) {
    const heightInMeters = this.profile.physicalStats.height / 100;
    this.profile.physicalStats.bmi = (this.profile.physicalStats.weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
};

// Update timestamp on save
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);