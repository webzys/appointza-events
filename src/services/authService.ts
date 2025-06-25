
import { User } from '@/types/models';
import { dataService } from './dataService';

export interface LoginCredentials {
  emailOrMobile: string;
  loginType: 'email' | 'mobile';
}

export interface OTPVerification {
  emailOrMobile: string;
  otp: string;
}

class AuthService {
  private currentUser: User | null = null;
  private pendingOTP: { emailOrMobile: string; otp: string; user: User } | null = null;

  // Dummy users for testing different scenarios
  private getDummyUsers(): User[] {
    return [
      {
        id: "user_email_only",
        name: "John Email User",
        email: "john@example.com",
        phone: "+91 9876543210",
        isAadhaarVerified: false,
        rating: 4.2,
        totalRatings: 15,
        subscriptionStatus: 'inactive',
        subscriptionTier: 'Basic',
        subscriptionEnd: '2024-10-15',
        eventsAttended: 5,
        eventsCancelled: 1,
        applicationsAccepted: 8,
        applicationsRejected: 2,
        totalApplications: 10,
        averageRating: 4.2,
        feedbackHistory: [],
        performanceStats: {
          totalJobs: 5,
          completedJobs: 4,
          cancelledJobs: 1,
          onTimePercentage: 80,
          qualityRating: 4.1,
          professionalismRating: 4.3,
          recommendationRate: 75,
          responsiveness: 4.0
        }
      },
      {
        id: "user_aadhaar_verified",
        name: "Priya Aadhaar User",
        email: "priya.verified@example.com",
        phone: "+91 9876543211",
        isAadhaarVerified: true,
        rating: 4.7,
        totalRatings: 32,
        subscriptionStatus: 'active',
        subscriptionTier: 'Basic',
        subscriptionEnd: '2024-12-31',
        eventsAttended: 25,
        eventsCancelled: 2,
        applicationsAccepted: 28,
        applicationsRejected: 4,
        totalApplications: 32,
        averageRating: 4.7,
        feedbackHistory: [],
        performanceStats: {
          totalJobs: 25,
          completedJobs: 23,
          cancelledJobs: 2,
          onTimePercentage: 92,
          qualityRating: 4.6,
          professionalismRating: 4.8,
          recommendationRate: 88,
          responsiveness: 4.5
        }
      },
      {
        id: "user_premium_subscriber",
        name: "Rajesh Premium User",
        email: "rajesh.premium@example.com",
        phone: "+91 9876543212",
        isAadhaarVerified: true,
        rating: 4.9,
        totalRatings: 45,
        subscriptionStatus: 'active',
        subscriptionTier: 'Premium',
        subscriptionEnd: '2025-06-30',
        eventsAttended: 42,
        eventsCancelled: 1,
        applicationsAccepted: 40,
        applicationsRejected: 3,
        totalApplications: 45,
        averageRating: 4.9,
        feedbackHistory: [],
        performanceStats: {
          totalJobs: 42,
          completedJobs: 41,
          cancelledJobs: 1,
          onTimePercentage: 98,
          qualityRating: 4.8,
          professionalismRating: 4.9,
          recommendationRate: 95,
          responsiveness: 4.7
        }
      }
    ];
  }

  async login(credentials: LoginCredentials): Promise<{ requiresOTP: boolean; message: string }> {
    const { emailOrMobile, loginType } = credentials;
    const users = this.getDummyUsers();
    
    let user: User | undefined;
    
    if (loginType === 'email') {
      user = users.find(u => u.email === emailOrMobile);
    } else {
      user = users.find(u => u.phone === emailOrMobile);
    }

    if (!user) {
      throw new Error('User not found');
    }

    if (loginType === 'mobile') {
      // Generate dummy OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      this.pendingOTP = { emailOrMobile, otp, user };
      
      console.log(`Dummy OTP for ${emailOrMobile}: ${otp}`);
      
      return {
        requiresOTP: true,
        message: `OTP sent to ${emailOrMobile}. Use: ${otp}`
      };
    } else {
      // Email login - direct login
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return {
        requiresOTP: false,
        message: 'Login successful'
      };
    }
  }

  async verifyOTP(verification: OTPVerification): Promise<{ success: boolean; message: string }> {
    if (!this.pendingOTP) {
      return { success: false, message: 'No pending OTP verification' };
    }

    if (this.pendingOTP.emailOrMobile !== verification.emailOrMobile) {
      return { success: false, message: 'Invalid mobile number' };
    }

    if (this.pendingOTP.otp !== verification.otp) {
      return { success: false, message: 'Invalid OTP' };
    }

    // OTP verified successfully
    this.currentUser = this.pendingOTP.user;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.pendingOTP = null;

    return { success: true, message: 'Login successful' };
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    this.pendingOTP = null;
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const authService = new AuthService();
