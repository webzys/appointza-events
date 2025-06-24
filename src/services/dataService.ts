
import { 
  applications, 
  services, 
  events, 
  currentUser, 
  userStats, 
  ratings, 
  payments,
  RAZORPAY_CONFIG 
} from '@/data/dummyData';
import { Application, Service, Event, User, UserStats, Rating, Payment } from '@/types/models';

class DataService {
  // User related methods
  getCurrentUser(): User {
    return currentUser;
  }

  getUserStats(): UserStats {
    return userStats;
  }

  updateUserVerification(verified: boolean): User {
    currentUser.isAadhaarVerified = verified;
    return currentUser;
  }

  // Application related methods
  getApplications(userId?: string): Application[] {
    if (userId) {
      return applications.filter(app => app.userId === userId);
    }
    return applications;
  }

  getApplicationById(id: number): Application | undefined {
    return applications.find(app => app.id === id);
  }

  updateApplicationStatus(id: number, status: Application['status']): Application | null {
    const application = applications.find(app => app.id === id);
    if (application) {
      application.status = status;
      return application;
    }
    return null;
  }

  // Service related methods
  getServices(ownerId?: string): Service[] {
    if (ownerId) {
      return services.filter(service => service.ownerId === ownerId);
    }
    return services;
  }

  getServiceById(id: number): Service | undefined {
    return services.find(service => service.id === id);
  }

  createService(serviceData: Omit<Service, 'id' | 'applications'>): Service {
    const newService: Service = {
      ...serviceData,
      id: Math.max(...services.map(s => s.id)) + 1,
      applications: []
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

  filterApplications(
    searchTerm: string = '', 
    statusFilter: string = 'all', 
    typeFilter: string = 'all'
  ): Application[] {
    return applications.filter(app => {
      const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      const matchesType = typeFilter === "all" || app.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }
}

export const dataService = new DataService();
