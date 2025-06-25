import { User, Application, Service, Event, UserStats, Rating, Payment, UserFeedback, UserPerformanceStats } from '@/types/models';

// Enhanced users with comprehensive feedback data
export const users: User[] = [
  {
    id: "user1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    isAadhaarVerified: true,
    rating: 4.8,
    totalRatings: 42,
    subscriptionStatus: 'active',
    subscriptionTier: 'Premium',
    subscriptionEnd: '2024-12-31',
    eventsAttended: 38,
    eventsCancelled: 2,
    applicationsAccepted: 35,
    applicationsRejected: 5,
    totalApplications: 42,
    averageRating: 4.8,
    feedbackHistory: [],
    performanceStats: {
      totalJobs: 38,
      completedJobs: 36,
      cancelledJobs: 2,
      onTimePercentage: 95,
      qualityRating: 4.7,
      professionalismRating: 4.9,
      recommendationRate: 92,
      responsiveness: 4.6
    }
  },
  {
    id: "user2", 
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543211",
    isAadhaarVerified: true,
    rating: 4.5,
    totalRatings: 28,
    subscriptionStatus: 'active',
    subscriptionTier: 'Basic',
    subscriptionEnd: '2024-11-30',
    eventsAttended: 25,
    eventsCancelled: 1,
    applicationsAccepted: 24,
    applicationsRejected: 3,
    totalApplications: 28,
    averageRating: 4.5,
    feedbackHistory: [],
    performanceStats: {
      totalJobs: 25,
      completedJobs: 24,
      cancelledJobs: 1,
      onTimePercentage: 88,
      qualityRating: 4.4,
      professionalismRating: 4.6,
      recommendationRate: 85,
      responsiveness: 4.3
    }
  },
  {
    id: "user3",
    name: "Amit Patel", 
    email: "amit@example.com",
    phone: "+91 9876543212",
    isAadhaarVerified: false,
    rating: 3.8,
    totalRatings: 15,
    subscriptionStatus: 'inactive',
    subscriptionTier: 'Basic',
    subscriptionEnd: '2024-10-15',
    eventsAttended: 12,
    eventsCancelled: 3,
    applicationsAccepted: 12,
    applicationsRejected: 2,
    totalApplications: 15,
    averageRating: 3.8,
    feedbackHistory: [],
    performanceStats: {
      totalJobs: 12,
      completedJobs: 10,
      cancelledJobs: 3,
      onTimePercentage: 75,
      qualityRating: 3.9,
      professionalismRating: 3.7,
      recommendationRate: 68,
      responsiveness: 3.5
    }
  }
];

// User feedback data
export const userFeedback: UserFeedback[] = [
  {
    id: 1,
    fromUserId: "user1",
    fromUserName: "Rajesh Kumar",
    serviceId: 1,
    rating: 5,
    comment: "Excellent photography service! Very professional and delivered amazing results.",
    isOnTime: true,
    isServiceGood: true,
    isProfessional: true,
    wouldRecommend: true,
    createdAt: "2024-01-15T10:30:00Z",
    serviceTitle: "Wedding Photography"
  },
  {
    id: 2,
    fromUserId: "user1", 
    fromUserName: "Rajesh Kumar",
    eventId: 1,
    rating: 4,
    comment: "Great event management, minor delays but overall good experience.",
    isOnTime: false,
    isServiceGood: true,
    isProfessional: true,
    wouldRecommend: true,
    createdAt: "2024-02-20T14:15:00Z",
    eventTitle: "Corporate Conference"
  },
  {
    id: 3,
    fromUserId: "user2",
    fromUserName: "Priya Sharma",
    serviceId: 2,
    rating: 4,
    comment: "Good catering service, food quality was excellent.",
    isOnTime: true,
    isServiceGood: true,
    isProfessional: true,
    wouldRecommend: true,
    createdAt: "2024-03-10T09:45:00Z",
    serviceTitle: "Wedding Catering"
  },
  {
    id: 4,
    fromUserId: "user3",
    fromUserName: "Amit Patel",
    serviceId: 1,
    rating: 3,
    comment: "Average service, could be better with communication.",
    isOnTime: true,
    isServiceGood: false,
    isProfessional: false,
    wouldRecommend: false,
    createdAt: "2024-03-25T16:20:00Z",
    serviceTitle: "Wedding Photography"
  }
];

export const currentUser: User = users[0];

export const applications: Application[] = [
  {
    id: 1,
    title: "Wedding Photography",
    type: "service",
    location: "Mumbai, Maharashtra",
    date: "2024-02-15",
    status: "confirmed",
    appliedDate: "2024-01-20",
    price: "₹25,000",
    description: "Professional wedding photography for a grand celebration",
    userId: "user1"
  },
  {
    id: 2,
    title: "Corporate Event Management",
    type: "event",
    location: "Bangalore, Karnataka", 
    date: "2024-03-10",
    status: "pending",
    appliedDate: "2024-02-25",
    price: "₹50,000",
    description: "Complete event management for corporate conference",
    userId: "user2"
  },
  {
    id: 3,
    title: "Birthday Party Decoration",
    type: "service",
    location: "Delhi, Delhi",
    date: "2024-01-05",
    status: "rejected",
    appliedDate: "2023-12-20",
    price: "₹15,000",
    description: "Themed decoration for children's birthday party",
    userId: "user3"
  }
];

export const services: Service[] = [
  {
    id: 1,
    title: "Professional Wedding Photography",
    type: "Photography",
    bookings: 45,
    status: "active",
    price: "₹25,000",
    ownerId: "user1",
    averageRating: 4.6,
    totalReviews: 23,
    feedbackSummary: {
      qualityRating: 4.8,
      timelinessRating: 4.5,
      professionalismRating: 4.7,
      valueForMoneyRating: 4.3,
      recommendationRate: 87,
      recentFeedback: []
    },
    applications: [
      {
        id: 1,
        clientName: "Rahul Verma",
        clientId: "user2",
        event: "Wedding Ceremony",
        date: "2024-02-20",
        status: "pending",
        serviceId: 1
      },
      {
        id: 2,
        clientName: "Sneha Gupta", 
        clientId: "user3",
        event: "Engagement Photoshoot",
        date: "2024-02-25",
        status: "confirmed",
        serviceId: 1
      }
    ]
  },
  {
    id: 2,
    title: "Premium Catering Services",
    type: "Catering",
    bookings: 32,
    status: "active", 
    price: "₹800/person",
    ownerId: "user2",
    averageRating: 4.3,
    totalReviews: 18,
    feedbackSummary: {
      qualityRating: 4.5,
      timelinessRating: 4.2,
      professionalismRating: 4.4,
      valueForMoneyRating: 4.1,
      recommendationRate: 78,
      recentFeedback: []
    },
    applications: []
  }
];

export const events: Event[] = [
  {
    id: 1,
    title: "Tech Conference 2024",
    category: "Corporate",
    location: "Mumbai, Maharashtra",
    date: "2024-03-15",
    price: "₹1,50,000",
    description: "Annual technology conference with industry leaders",
    ownerId: "user1",
    status: "active"
  },
  {
    id: 2,
    title: "Cultural Festival",
    category: "Cultural",
    location: "Jaipur, Rajasthan",
    date: "2024-04-20",
    price: "₹75,000",
    description: "Traditional cultural festival celebration",
    ownerId: "user2", 
    status: "active"
  }
];

export const userStats: UserStats = {
  totalApplications: 12,
  successfulApplications: 8,
  eventsCreated: 3,
  servicesCreated: 2,
  totalRequests: 15,
  rating: 4.7,
  subscriptionStatus: "active",
  subscriptionTier: "Premium",
  subscriptionEnd: "2024-12-31"
};

export const ratings: Rating[] = [
  {
    id: 1,
    serviceId: 1,
    userId: "user1",
    rating: 5,
    comment: "Excellent service, highly professional!",
    isOnTime: true,
    isServiceGood: true,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    eventId: 1,
    userId: "user2",
    rating: 4,
    comment: "Great event management, minor delays.",
    isOnTime: false,
    isServiceGood: true,
    createdAt: "2024-02-20T14:15:00Z"
  }
];

export const payments: Payment[] = [
  {
    id: "pay-1",
    applicationId: 1,
    amount: "₹25,000",
    status: "completed",
    razorpayPaymentId: "razorpay_test_123",
    createdAt: "2024-01-20T12:00:00Z"
  }
];

export const RAZORPAY_CONFIG = {
  key: 'rzp_test_dummy_key_123456789',
  currency: 'INR',
  company_name: 'Event Management Platform',
  description: 'Payment for booking confirmation',
  image: '/favicon.ico'
};
