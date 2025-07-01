
import { Application, Service, Event, User, UserStats, Rating, Payment, UserFeedback } from '@/types/models';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // User API methods
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/users/me');
  }

  async getUserStats(): Promise<UserStats> {
    return this.request<UserStats>('/users/stats');
  }

  async updateUserVerification(verified: boolean): Promise<User> {
    return this.request<User>('/users/verification', {
      method: 'PUT',
      body: JSON.stringify({ verified }),
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  async getUserFeedback(userId: string): Promise<UserFeedback[]> {
    return this.request<UserFeedback[]>(`/users/${userId}/feedback`);
  }

  // Application API methods
  async getApplications(userId?: string): Promise<Application[]> {
    const queryParam = userId ? `?userId=${userId}` : '';
    return this.request<Application[]>(`/applications${queryParam}`);
  }

  async getApplicationById(id: number): Promise<Application> {
    return this.request<Application>(`/applications/${id}`);
  }

  async updateApplicationStatus(id: number, status: Application['status']): Promise<Application> {
    return this.request<Application>(`/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Service API methods
  async getServices(ownerId?: string): Promise<Service[]> {
    const queryParam = ownerId ? `?ownerId=${ownerId}` : '';
    return this.request<Service[]>(`/services${queryParam}`);
  }

  async getServiceById(id: number): Promise<Service> {
    return this.request<Service>(`/services/${id}`);
  }

  async createService(serviceData: Omit<Service, 'id' | 'applications' | 'averageRating' | 'totalReviews' | 'feedbackSummary'>): Promise<Service> {
    return this.request<Service>('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  async updateServiceApplicationStatus(serviceId: number, applicationId: number, status: string): Promise<boolean> {
    try {
      await this.request(`/services/${serviceId}/applications/${applicationId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Event API methods
  async getEvents(ownerId?: string): Promise<Event[]> {
    const queryParam = ownerId ? `?ownerId=${ownerId}` : '';
    return this.request<Event[]>(`/events${queryParam}`);
  }

  async createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
    return this.request<Event>('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  // Rating API methods
  async getRatings(serviceId?: number, eventId?: number): Promise<Rating[]> {
    const params = new URLSearchParams();
    if (serviceId) params.append('serviceId', serviceId.toString());
    if (eventId) params.append('eventId', eventId.toString());
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return this.request<Rating[]>(`/ratings${queryString}`);
  }

  async createRating(ratingData: Omit<Rating, 'id' | 'createdAt'>): Promise<Rating> {
    return this.request<Rating>('/ratings', {
      method: 'POST',
      body: JSON.stringify(ratingData),
    });
  }

  // User feedback API methods
  async createUserFeedback(feedbackData: Omit<UserFeedback, 'id' | 'createdAt'>): Promise<UserFeedback> {
    return this.request<UserFeedback>('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }

  // Payment API methods
  async getPayments(applicationId?: number): Promise<Payment[]> {
    const queryParam = applicationId ? `?applicationId=${applicationId}` : '';
    return this.request<Payment[]>(`/payments${queryParam}`);
  }

  async createPayment(paymentData: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> {
    return this.request<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async updatePaymentStatus(paymentId: string, status: Payment['status'], razorpayPaymentId?: string): Promise<Payment> {
    return this.request<Payment>(`/payments/${paymentId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, razorpayPaymentId }),
    });
  }

  // Utility methods
  async filterApplications(searchTerm?: string, statusFilter?: string, typeFilter?: string): Promise<Application[]> {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
    if (typeFilter && typeFilter !== 'all') params.append('type', typeFilter);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return this.request<Application[]>(`/applications/filter${queryString}`);
  }
}

export const apiService = new ApiService();
