
import { User, Application, Service, Event, Rating, Payment, UserStats } from '@/types/models';

export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  isAadhaarVerified: true,
  rating: 4.7,
  totalRatings: 23,
  subscriptionStatus: 'active',
  subscriptionTier: 'Premium',
  subscriptionEnd: '2024-07-24'
};

export const applications: Application[] = [
  {
    id: 1,
    title: "Wedding Photography",
    type: "service",
    location: "Mumbai, Maharashtra",
    date: "2024-01-15",
    status: "pending",
    appliedDate: "2024-01-10",
    price: "₹25,000",
    description: "Professional wedding photography service for 2 days",
    userId: 'user-1'
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    type: "event",
    location: "Bangalore, Karnataka",
    date: "2024-02-20",
    status: "selected",
    appliedDate: "2024-01-05",
    price: "₹15,000",
    description: "Looking for event coordinators",
    userId: 'user-1'
  },
  {
    id: 3,
    title: "Birthday Party DJ",
    type: "service",
    location: "Delhi, NCR",
    date: "2024-01-25",
    status: "rejected",
    appliedDate: "2024-01-08",
    price: "₹8,000",
    description: "DJ services for birthday celebration",
    userId: 'user-1'
  },
  {
    id: 4,
    title: "Corporate Event",
    type: "event",
    location: "Pune, Maharashtra",
    date: "2024-03-10",
    status: "confirmed",
    appliedDate: "2024-01-12",
    price: "₹50,000",
    description: "Corporate event management",
    userId: 'user-1'
  }
];

export const services: Service[] = [
  {
    id: 1,
    title: "Professional Photography",
    type: "Photography",
    bookings: 3,
    status: "active",
    price: "₹20,000",
    ownerId: 'user-1',
    applications: [
      { id: 1, clientName: "Rohit Sharma", event: "Wedding", date: "2024-02-15", status: "pending", serviceId: 1 },
      { id: 2, clientName: "Priya Patel", event: "Engagement", date: "2024-02-20", status: "confirmed", serviceId: 1 },
      { id: 3, clientName: "Amit Kumar", event: "Birthday Party", date: "2024-02-25", status: "pending", serviceId: 1 }
    ]
  },
  {
    id: 2,
    title: "Event Coordination",
    type: "Event Management",
    bookings: 2,
    status: "active",
    price: "₹35,000",
    ownerId: 'user-1',
    applications: [
      { id: 4, clientName: "Sneha Reddy", event: "Corporate Event", date: "2024-03-05", status: "confirmed", serviceId: 2 },
      { id: 5, clientName: "Rajesh Gupta", event: "Conference", date: "2024-03-15", status: "pending", serviceId: 2 }
    ]
  }
];

export const events: Event[] = [
  {
    id: 1,
    title: "Music Festival 2024",
    category: "Entertainment",
    location: "Goa, India",
    date: "2024-03-15",
    price: "₹75,000",
    description: "Annual music festival seeking event coordinators",
    ownerId: 'user-1',
    status: 'active'
  }
];

export const ratings: Rating[] = [
  {
    id: 1,
    serviceId: 1,
    userId: 'client-1',
    rating: 5,
    comment: "Excellent photography service, very professional!",
    isOnTime: true,
    isServiceGood: true,
    createdAt: '2024-01-20'
  }
];

export const payments: Payment[] = [
  {
    id: 'pay-1',
    applicationId: 4,
    amount: '₹50,000',
    status: 'completed',
    razorpayPaymentId: 'rzp_test_1234567890',
    createdAt: '2024-01-15'
  }
];

export const userStats: UserStats = {
  totalApplications: 12,
  successfulApplications: 4,
  eventsCreated: 3,
  servicesCreated: 2,
  totalRequests: 8,
  rating: 4.7,
  subscriptionStatus: "active",
  subscriptionTier: "Premium",
  subscriptionEnd: "2024-07-24"
};

// Razorpay Configuration
export const RAZORPAY_CONFIG = {
  key: "rzp_test_dummy_key_12345",
  currency: "INR",
  name: "EventService Platform",
  description: "Payment for services",
  theme: {
    color: "#f97316"
  }
};
