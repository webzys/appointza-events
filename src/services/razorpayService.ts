
import { dataService } from './dataService';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  amount: number;
  currency: string;
  applicationId: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
}

class RazorpayService {
  private config = dataService.getRazorpayConfig();

  async initializePayment(options: RazorpayOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      // In a real implementation, you would load the Razorpay script
      // For now, we'll simulate the payment process
      console.log('Initializing Razorpay payment with config:', this.config);
      console.log('Payment options:', options);

      // Simulate payment processing
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
          const mockPaymentId = `rzp_test_${Date.now()}`;
          
          // Create payment record
          const payment = dataService.createPayment({
            applicationId: options.applicationId,
            amount: `₹${options.amount}`,
            status: 'completed',
            razorpayPaymentId: mockPaymentId
          });

          console.log('Payment successful:', payment);
          options.onSuccess(mockPaymentId);
          resolve();
        } else {
          const error = new Error('Payment failed - Demo simulation');
          console.error('Payment failed:', error);
          options.onError(error);
          reject(error);
        }
      }, 2000); // Simulate 2 second processing time
    });
  }

  async verifyPayment(paymentId: string, applicationId: number): Promise<boolean> {
    // In a real implementation, you would verify with your backend
    console.log('Verifying payment:', paymentId, 'for application:', applicationId);
    
    // Simulate verification
    const payment = dataService.getPayments(applicationId).find(p => p.razorpayPaymentId === paymentId);
    return payment !== undefined;
  }

  formatAmount(amount: string): number {
    // Convert ₹25,000 to 2500000 (paise)
    const numericAmount = parseFloat(amount.replace(/[₹,]/g, ''));
    return Math.round(numericAmount * 100);
  }
}

export const razorpayService = new RazorpayService();
