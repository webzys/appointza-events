
import { 
  applications, 
  services, 
  events, 
  currentUser, 
  userStats, 
  ratings, 
  payments,
  RAZORPAY_CONFIG,
  users,
  userFeedback
} from '@/data/dummyData';
import { Application, Service, Event, User, UserStats, Rating, Payment, UserFeedback } from '@/types/models';
import { apiService } from './apiService';

class DataService {
  private useApi = process.env.VITE_USE_API === 'true';

  // User related methods
  async getCurrentUser(): Promise<User> {
    if (this.useApi) {
      try {
        return await apiService.getCurrentUser();
      } catch (error) {
        console.error('Failed to fetch current user from API, falling back to dummy data:', error);
      }
    }
    return currentUser;
  }

  async getUserStats(): Promise<UserStats> {
    if (this.useApi) {
      try {
        return await apiService.getUserStats();
      } catch (error) {
        console.error('Failed to fetch user stats from API, falling back to dummy data:', error);
      }
    }
    return userStats;
  }

  async updateUserVerification(verified: boolean): Promise<User> {
    if (this.useApi) {
      try {
        return await apiService.updateUserVerification(verified);
      } catch (error) {
        console.error('Failed to update user verification via API, falling back to dummy data:', error);
      }
    }
    currentUser.isAadhaarVerified = verified;
    return currentUser;
  }

  async getUserById(id: string): Promise<User | undefined> {
    if (this.useApi) {
      try {
        return await apiService.getUserById(id);
      } catch (error) {
        console.error(`Failed to fetch user ${id} from API, falling back to dummy data:`, error);
      }
    }
    return users.find(user => user.id === id);
  }

  async getUserFeedback(userId: string): Promise<UserFeedback[]> {
    if (this.useApi) {
      try {
        return await apiService.getUserFeedback(userId);
      } catch (error) {
        console.error(`Failed to fetch user feedback for ${userId} from API, falling back to dummy data:`, error);
      }
    }
    return userFeedback.filter(feedback => feedback.fromUserId === userId);
  }

  // Application related methods
  async getApplications(userId?: string): Promise<Application[]> {
    if (this.useApi) {
      try {
        const apiApplications = await apiService.getApplications(userId);
        // Enhance applications with user details
        return Promise.all(apiApplications.map(async (app) => ({
          ...app,
          userDetails: await this.getUserById(app.userId)
        })));
      } catch (error) {
        console.error('Failed to fetch applications from API, falling back to dummy data:', error);
      }
    }
    
    let filteredApplications = applications;
    if (userId) {
      filteredApplications = applications.filter(app => app.userId === userId);
    }
    
    // Enhance applications with user details
    return filteredApplications.map(app => ({
      ...app,
      userDetails: this.getUserById(app.userId)
    }));
  }

  async getApplicationById(id: number): Promise<Application | undefined> {
    if (this.useApi) {
      try {
        const application = await apiService.getApplicationById(id);
        return {
          ...application,
          userDetails: await this.getUserById(application.userId)
        };
      } catch (error) {
        console.error(`Failed to fetch application ${id} from API, falling back to dummy data:`, error);
      }
    }
    
    const application = applications.find(app => app.id === id);
    if (application) {
      return {
        ...application,
        userDetails: this.getUserById(application.userId)
      };
    }
    return undefined;
  }

  async updateApplicationStatus(id: number, status: Application['status']): Promise<Application | null> {
    if (this.useApi) {
      try {
        const application = await apiService.updateApplicationStatus(id, status);
        return {
          ...application,
          userDetails: await this.getUserById(application.userId)
        };
      } catch (error) {
        console.error(`Failed to update application ${id} status via API, falling back to dummy data:`, error);
      }
    }
    
    const application = applications.find(app => app.id === id);
    if (application) {
      application.status = status;
      return {
        ...application,
        userDetails: this.getUserById(application.userId)
      };
    }
    return null;
  }

  // Service related methods - Updated to properly filter by owner
  async getServices(ownerId?: string): Promise<Service[]> {
    if (this.useApi) {
      try {
        const apiServices = await apiService.getServices(ownerId);
        // Enhance services with user details in applications
        return Promise.all(apiServices.map(async (service) => ({
          ...service,
          applications: await Promise.all(service.applications.map(async (app) => ({
            ...app,
            userDetails: await this.getUserById(app.clientId)
          })))
        })));
      } catch (error) {
        console.error('Failed to fetch services from API, falling back to dummy data:', error);
      }
    }
    
    let filteredServices = services;
    if (ownerId) {
      // Filter services by ownerId to show only user's own services
      filteredServices = services.filter(service => service.ownerId === ownerId);
      console.log(`Filtering services for owner ${ownerId}:`, filteredServices);
    }
    
    // Enhance services with user details in applications
    return filteredServices.map(service => ({
      ...service,
      applications: service.applications.map(app => ({
        ...app,
        userDetails: this.getUserById(app.clientId)
      }))
    }));
  }

  getServiceById(id: number): Service | undefined {
    const service = services.find(service => service.id === id);
    if (service) {
      return {
        ...service,
        applications: service.applications.map(app => ({
          ...app,
          userDetails: this.getUserById(app.clientId)
        }))
      };
    }
    return undefined;
  }

  createService(serviceData: Omit<Service, 'id' | 'applications' | 'averageRating' | 'totalReviews' | 'feedbackSummary'>): Service {
    const newService: Service = {
      ...serviceData,
      id: Math.max(...services.map(s => s.id)) + 1,
      applications: [],
      averageRating: 0,
      totalReviews: 0,
      feedbackSummary: {
        qualityRating: 0,
        timelinessRating: 0,
        professionalismRating: 0,
        valueForMoneyRating: 0,
        recommendationRate: 0,
        recentFeedback: []
      }
    };
    services.push(newService);
    return newService;
  }

  updateServiceApplicationStatus(serviceId: number, applicationId: number, status: string): boolean {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      const application = service.applications.find(app => app.id === applicationId);
      if (application) {
        application.status = status as any;
        
        // Update user statistics based on status change
        const user = this.getUserById(application.clientId);
        if (user) {
          if (status === 'confirmed') {
            user.applicationsAccepted++;
          } else if (status === 'rejected') {
            user.applicationsRejected++;
          }
        }
        
        return true;
      }
    }
    return false;
  }

  // Event related methods
  getEvents(ownerId?: string): Event[] {
    if (ownerId) {
      return events.filter(event => event.ownerId === ownerId);
    }
    return events;
  }

  createEvent(eventData: Omit<Event, 'id'>): Event {
    const newEvent: Event = {
      ...eventData,
      id: Math.max(...events.map(e => e.id)) + 1
    };
    events.push(newEvent);
    return newEvent;
  }

  // Rating related methods
  getRatings(serviceId?: number, eventId?: number): Rating[] {
    let filteredRatings = ratings;
    if (serviceId) {
      filteredRatings = filteredRatings.filter(r => r.serviceId === serviceId);
    }
    if (eventId) {
      filteredRatings = filteredRatings.filter(r => r.eventId === eventId);
    }
    return filteredRatings;
  }

  createRating(ratingData: Omit<Rating, 'id' | 'createdAt'>): Rating {
    const newRating: Rating = {
      ...ratingData,
      id: Math.max(...ratings.map(r => r.id)) + 1,
      createdAt: new Date().toISOString()
    };
    ratings.push(newRating);
    return newRating;
  }

  // Enhanced feedback methods
  createUserFeedback(feedbackData: Omit<UserFeedback, 'id' | 'createdAt'>): UserFeedback {
    const newFeedback: UserFeedback = {
      ...feedbackData,
      id: Math.max(...userFeedback.map(f => f.id)) + 1,
      createdAt: new Date().toISOString()
    };
    userFeedback.push(newFeedback);
    
    // Update user's average rating
    this.updateUserRating(feedbackData.fromUserId);
    
    return newFeedback;
  }

  private updateUserRating(userId: string): void {
    const user = this.getUserById(userId);
    if (user) {
      const userFeedbacks = this.getUserFeedback(userId);
      if (userFeedbacks.length > 0) {
        const avgRating = userFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / userFeedbacks.length;
        user.averageRating = Math.round(avgRating * 10) / 10;
        user.totalRatings = userFeedbacks.length;
        
        // Update performance stats
        const onTimeCount = userFeedbacks.filter(f => f.isOnTime).length;
        const goodServiceCount = userFeedbacks.filter(f => f.isServiceGood).length;
        const professionalCount = userFeedbacks.filter(f => f.isProfessional).length;
        const recommendCount = userFeedbacks.filter(f => f.wouldRecommend).length;
        
        user.performanceStats = {
          totalJobs: userFeedbacks.length,
          completedJobs: userFeedbacks.length, // Assuming all feedback is for completed jobs
          cancelledJobs: user.eventsCancelled,
          onTimePercentage: Math.round((onTimeCount / userFeedbacks.length) * 100),
          qualityRating: Math.round((goodServiceCount / userFeedbacks.length) * 5 * 10) / 10,
          professionalismRating: Math.round((professionalCount / userFeedbacks.length) * 5 * 10) / 10,
          recommendationRate: Math.round((recommendCount / userFeedbacks.length) * 100),
          responsiveness: Math.round(Math.random() * 5 * 10) / 10 // Placeholder for now
        };
      }
    }
  }

  // Payment related methods
  getPayments(applicationId?: number): Payment[] {
    if (applicationId) {
      return payments.filter(p => p.applicationId === applicationId);
    }
    return payments;
  }

  createPayment(paymentData: Omit<Payment, 'id' | 'createdAt'>): Payment {
    const newPayment: Payment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    payments.push(newPayment);
    return newPayment;
  }

  updatePaymentStatus(paymentId: string, status: Payment['status'], razorpayPaymentId?: string): Payment | null {
    const payment = payments.find(p => p.id === paymentId);
    if (payment) {
      payment.status = status;
      if (razorpayPaymentId) {
        payment.razorpayPaymentId = razorpayPaymentId;
      }
      return payment;
    }
    return null;
  }

  // Razorpay configuration
  getRazorpayConfig() {
    return RAZORPAY_CONFIG;
  }

  // Utility methods
  isEventExpired(dateString: string): boolean {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate < today;
  }

  async filterApplications(
    searchTerm: string = '', 
    statusFilter: string = 'all', 
    typeFilter: string = 'all'
  ): Promise<Application[]> {
    if (this.useApi) {
      try {
        const apiApplications = await apiService.filterApplications(searchTerm, statusFilter, typeFilter);
        // Enhance with user details
        return Promise.all(apiApplications.map(async (app) => ({
          ...app,
          userDetails: await this.getUserById(app.userId)
        })));
      } catch (error) {
        console.error('Failed to filter applications via API, falling back to dummy data:', error);
      }
    }
    
    const filtered = applications.filter(app => {
      const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      const matchesType = typeFilter === "all" || app.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    
    // Enhance with user details
    return filtered.map(app => ({
      ...app,
      userDetails: this.getUserById(app.userId)
    }));
  }

  // Calculate overall user rating based on multiple factors
  calculateOverallRating(userId: string): number {
    const user = this.getUserById(userId);
    if (!user) return 0;
    
    const feedback = this.getUserFeedback(userId);
    if (feedback.length === 0) return 0;
    
    // Weight different factors
    const ratingWeight = 0.4;
    const onTimeWeight = 0.3;
    const qualityWeight = 0.2;
    const professionalismWeight = 0.1;
    
    const avgRating = feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length;
    const onTimeRate = feedback.filter(f => f.isOnTime).length / feedback.length;
    const qualityRate = feedback.filter(f => f.isServiceGood).length / feedback.length;
    const professionalRate = feedback.filter(f => f.isProfessional).length / feedback.length;
    
    const overallRating = (
      avgRating * ratingWeight +
      onTimeRate * 5 * onTimeWeight +
      qualityRate * 5 * qualityWeight +
      professionalRate * 5 * professionalismWeight
    );
    
    return Math.round(overallRating * 10) / 10;
  }
}

export const dataService = new DataService();
