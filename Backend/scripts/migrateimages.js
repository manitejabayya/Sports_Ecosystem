const mongoose = require('mongoose');
const User = require('../models/User');
const Notification = require('../models/Notification');
require('dotenv').config();

// Sample data for seeding
const sampleAthletes = [
  {
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    password: 'password123',
    role: 'athlete',
    profile: {
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9da6e41?w=150&h=150&fit=crop&crop=face',
      dateOfBirth: new Date('1998-05-15'),
      gender: 'female',
      phone: '+91-9876543210',
      location: {
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        coordinates: {
          latitude: 28.7041,
          longitude: 77.1025
        }
      },
      sports: [{
        sportName: 'Track & Field',
        category: '100m Sprint',
        level: 'advanced',
        experience: 5,
        achievements: ['State Championship 2023', 'National Qualifier']
      }],
      physicalStats: {
        height: 165,
        weight: 55,
        bmi: 20.2
      },
      emergencyContact: {
        name: 'Rajesh Singh',
        relation: 'Father',
        phone: '+91-9876543211'
      }
    },
    athleteData: {
      fitnessScore: 92,
      performanceLevel: 7,
      totalTrainingDays: 45,
      totalAssessments: 12,
      badges: [
        {
          name: 'Speed Demon',
          description: 'Achieved personal best in 100m sprint',
          icon: 'zap',
          earnedAt: new Date('2024-01-15')
        },
        {
          name: 'Consistency King',
          description: '30 days training streak',
          icon: 'calendar',
          earnedAt: new Date('2024-02-01')
        }
      ],
      goals: [
        {
          title: 'Sub-12 Second 100m',
          description: 'Break the 12-second barrier in 100m sprint',
          targetValue: 11.99,
          currentValue: 12.15,
          unit: 'seconds',
          deadline: new Date('2024-12-31'),
          status: 'active'
        },
        {
          title: 'Weekly Training Hours',
          description: 'Complete 15 hours of training per week',
          targetValue: 15,
          currentValue: 12,
          unit: 'hours',
          deadline: new Date('2024-03-31'),
          status: 'active'
        }
      ],
      trainingSessions: [
        {
          date: new Date('2024-01-20'),
          duration: 90,
          sport: 'Track & Field',
          intensity: 'high',
          notes: 'Sprint intervals and technique work',
          performanceMetrics: {
            distance: 2000,
            avgSpeed: 15.5,
            maxSpeed: 22.3
          }
        },
        {
          date: new Date('2024-01-18'),
          duration: 60,
          sport: 'Track & Field',
          intensity: 'medium',
          notes: 'Recovery run and stretching',
          performanceMetrics: {
            distance: 3000,
            avgSpeed: 12.0
          }
        }
      ]
    }
  },
  {
    name: 'Arjun Patel',
    email: 'arjun.patel@example.com',
    password: 'password123',
    role: 'athlete',
    profile: {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      dateOfBirth: new Date('1999-08-22'),
      gender: 'male',
      phone: '+91-9876543220',
      location: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        coordinates: {
          latitude: 19.0760,
          longitude: 72.8777
        }
      },
      sports: [{
        sportName: 'Swimming',
        category: 'Freestyle',
        level: 'intermediate',
        experience: 3,
        achievements: ['Regional Championship 2023']
      }],
      physicalStats: {
        height: 175,
        weight: 70,
        bmi: 22.9
      }
    },
    athleteData: {
      fitnessScore: 85,
      performanceLevel: 5,
      totalTrainingDays: 38,
      totalAssessments: 8,
      badges: [
        {
          name: 'Water Warrior',
          description: 'Completed 100 swimming sessions',
          icon: 'waves',
          earnedAt: new Date('2024-01-10')
        }
      ],
      goals: [
        {
          title: '50m Freestyle under 25s',
          description: 'Achieve sub-25 second 50m freestyle',
          targetValue: 25.00,
          currentValue: 26.50,
          unit: 'seconds',
          deadline: new Date('2024-06-30'),
          status: 'active'
        }
      ]
    }
  }
];

const sampleCoaches = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    password: 'password123',
    role: 'coach',
    profile: {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      dateOfBirth: new Date('1980-03-10'),
      gender: 'male',
      phone: '+91-9876543230',
      location: {
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India'
      }
    },
    coachData: {
      certification: ['Level 3 Athletics Coach', 'Sports Science Diploma'],
      specialization: ['Sprint Training', 'Speed Development', 'Youth Athletics'],
      experience: 15,
      rating: 4.8,
      totalAthletes: 25
    }
  }
];

const migrateData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sports_talent');
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Notification.deleteMany({});
    
    // Create athletes
    console.log('Creating sample athletes...');
    const createdAthletes = await User.create(sampleAthletes);
    console.log(`Created ${createdAthletes.length} athletes`);

    // Create coaches
    console.log('Creating sample coaches...');
    const createdCoaches = await User.create(sampleCoaches);
    console.log(`Created ${createdCoaches.length} coaches`);

    // Assign some athletes to coaches
    if (createdCoaches.length > 0 && createdAthletes.length > 0) {
      const coach = createdCoaches[0];
      coach.coachData.athletes = [
        {
          athleteId: createdAthletes[0]._id,
          assignedAt: new Date(),
          status: 'active'
        }
      ];
      await coach.save();
      console.log('Assigned athlete to coach');
    }

    // Create sample notifications
    console.log('Creating sample notifications...');
    const sampleNotifications = createdAthletes.map(athlete => ([
      {
        recipient: athlete._id,
        title: 'Welcome to Sports Talent Ecosystem!',
        message: 'Complete your profile to get personalized training recommendations',
        type: 'system_update',
        priority: 'medium'
      },
      {
        recipient: athlete._id,
        title: 'New Achievement Unlocked!',
        message: 'You\'ve earned the "Getting Started" badge',
        type: 'badge_earned',
        priority: 'high'
      },
      {
        recipient: athlete._id,
        title: 'Training Reminder',
        message: 'Don\'t forget your training session today at 6 PM',
        type: 'training_reminder',
        priority: 'medium'
      }
    ])).flat();

    await Notification.create(sampleNotifications);
    console.log(`Created ${sampleNotifications.length} notifications`);

    console.log('✅ Migration completed successfully!');
    console.log('\nSample login credentials:');
    console.log('Athlete: priya.singh@example.com / password123');
    console.log('Coach: rajesh.kumar@example.com / password123');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run migration
migrateData();