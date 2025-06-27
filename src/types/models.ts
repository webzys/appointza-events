
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAadhaarVerified: boolean;
  rating: number;
  totalRatings: number;
  subscriptionStatus: 'active' | 'inactive';
  subscriptionTier: 'Basic' | 'Premium';
  subscriptionEnd: string;
  // Enhanced feedback and statistics
  eventsAttended: number;
  eventsCancelled: number;
  applicationsAccepted: number;
  applicationsRejected: number;
  totalApplications: number;
  averageRating: number;
  feedbackHistory: UserFeedback[];
  performanceStats: UserPerformanceStats;
}

export interface UserFeedback {
  id: number;
  fromUserId: string;
  fromUserName: string;
  serviceId?: number;
  eventId?: number;
  rating: number;
  comment: string;
  isOnTime: boolean;
  isServiceGood: boolean;
  isProfessional: boolean;
  wouldRecommend: boolean;
  createdAt: string;
  eventTitle?: string;
  serviceTitle?: string;
}

export interface UserPerformanceStats {
  totalJobs: number;
  completedJobs: number;
  cancelledJobs: number;
  onTimePercentage: number;
  qualityRating: number;
  professionalismRating: number;
  recommendationRate: number;
  responsiveness: number;
}

export interface Application {
  id: number;
  title: string;
  type: 'event' | 'service';
  location: string;
  date: string;
  status: 'pending' | 'selected' | 'confirmed' | 'rejected';
  appliedDate: string;
  price: string;
  description: string;
  userId: string;
  // Enhanced with user details for display
  userDetails?: User;
}

export interface Service {
  id: number;
  title: string;
  type: string;
  bookings: number;
  status: 'active' | 'inactive';
  price: string;
  description: string;
  location: string;
  ownerId: string;
  applications: ServiceApplication[];
  // Enhanced feedback data
  averageRating: number;
  totalReviews: number;
  feedbackSummary: ServiceFeedbackSummary;
}

export interface ServiceFeedbackSummary {
  qualityRating: number;
  timelinessRating: number;
  professionalismRating: number;
  valueForMoneyRating: number;
  recommendationRate: number;
  recentFeedback: UserFeedback[];
}

export interface ServiceApplication {
  id: number;
  clientName: string;
  clientId: string;
  event: string;
  date: string;
  status: 'pending' | 'confirmed' | 'rejected';
  serviceId: number;
  // Enhanced with user details
  userDetails?: User;
}

export interface Event {
  id: number;
  title: string;
  category: string;
  location: string;
  date: string;
  price: string;
  description: string;
  ownerId: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Rating {
  id: number;
  serviceId?: number;
  eventId?: number;
  userId: string;
  rating: number;
  comment: string;
  isOnTime: boolean;
  isServiceGood: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  applicationId: number;
  amount: string;
  status: 'pending' | 'completed' | 'failed';
  razorpayPaymentId?: string;
  createdAt: string;
}

export interface UserStats {
  totalApplications: number;
  successfulApplications: number;
  eventsCreated: number;
  servicesCreated: number;
  totalRequests: number;
  rating: number;
  subscriptionStatus: string;
  subscriptionTier: string;
  subscriptionEnd: string;
}
