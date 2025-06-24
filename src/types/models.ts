
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
}

export interface Service {
  id: number;
  title: string;
  type: string;
  bookings: number;
  status: 'active' | 'inactive';
  price: string;
  ownerId: string;
  applications: ServiceApplication[];
}

export interface ServiceApplication {
  id: number;
  clientName: string;
  event: string;
  date: string;
  status: 'pending' | 'confirmed' | 'rejected';
  serviceId: number;
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
