const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Please add a notification title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  message: {
    type: String,
    required: [true, 'Please add a notification message'],
    maxlength: [500, 'Message cannot be more than 500 characters']
  },
  type: {
    type: String,
    enum: [
      'performance_update',
      'goal_achievement',
      'training_reminder',
      'coach_message',
      'community_activity',
      'assessment_complete',
      'badge_earned',
      'system_update',
      'security_alert'
    ],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  data: {
    // Additional context data for the notification
    type: mongoose.Schema.Types.Mixed
  },
  actionUrl: String, // URL to redirect when notification is clicked
  expiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
NotificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static method to create notification
NotificationSchema.statics.createNotification = async function(notificationData) {
  try {
    const notification = await this.create(notificationData);
    
    // Populate sender info
    await notification.populate('sender', 'name profile.avatar');
    
    return notification;
  } catch (error) {
    throw error;
  }
};

// Instance method to mark as read
NotificationSchema.methods.markAsRead = async function() {
  this.read = true;
  this.readAt = new Date();
  return await this.save();
};

module.exports = mongoose.model('Notification', NotificationSchema);