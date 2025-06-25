
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { authService } from '@/services/authService';
import { dataService } from '@/services/dataService';
import { razorpayService } from '@/services/razorpayService';
import UserDetailCard from '@/components/UserDetailCard';
import AadhaarVerification from '@/components/AadhaarVerification';
import { User, Service, Event, Application } from '@/types/models';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Settings, 
  CreditCard, 
  Shield,
  Search,
  Filter,
  LogOut
} from "lucide-react";

const MyStatus: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [myServices, setMyServices] = useState<Service[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setCurrentUser(user);
    loadUserData(user.id);
  }, []);

  const loadUserData = (userId: string) => {
    // Load user's own services and events
    const userServices = dataService.getServices(userId);
    const userEvents = dataService.getEvents(userId);
    
    // Load all available services and events
    const allAvailableServices = dataService.getServices();
    const allAvailableEvents = dataService.getEvents();
    
    // Load user's applications
    const userApplications = dataService.getApplications(userId);

    setMyServices(userServices);
    setMyEvents(userEvents);
    setAllServices(allAvailableServices);
    setAllEvents(allAvailableEvents);
    setApplications(userApplications);
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const handleUpgradeSubscription = async () => {
    if (!currentUser) return;

    setIsProcessingPayment(true);
    
    try {
      const amount = currentUser.subscriptionTier === 'Basic' ? 99900 : 49900; // ₹999 for Premium, ₹499 for Basic
      
      await razorpayService.initializePayment({
        amount,
        currency: 'INR',
        applicationId: 0, // Special ID for subscription payments
        onSuccess: (paymentId) => {
          toast({
            title: "Payment Successful",
            description: "Your subscription has been upgraded!",
          });
          
          // Update user subscription status
          if (currentUser) {
            currentUser.subscriptionStatus = 'active';
            currentUser.subscriptionTier = 'Premium';
            currentUser.subscriptionEnd = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            setCurrentUser({ ...currentUser });
          }
        },
        onError: (error) => {
          toast({
            title: "Payment Failed",
            description: "Unable to process payment. Please try again.",
            variant: "destructive",
          });
        }
      });
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An error occurred while processing payment.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleServiceApplicationStatusChange = (serviceId: number, applicationId: number, status: string) => {
    const success = dataService.updateServiceApplicationStatus(serviceId, applicationId, status);
    if (success) {
      loadUserData(currentUser!.id);
      toast({
        title: "Status Updated",
        description: `Application ${status} successfully`,
      });
    }
  };

  const getFilteredApplications = () => {
    return applications.filter(app => {
      const matchesSearch = searchTerm === '' || 
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesType = typeFilter === 'all' || app.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Status</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* User Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Account Overview</span>
            <div className="flex gap-2">
              <AadhaarVerification />
              {currentUser.subscriptionStatus === 'inactive' && (
                <Button 
                  onClick={handleUpgradeSubscription}
                  disabled={isProcessingPayment}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isProcessingPayment ? "Processing..." : "Upgrade Plan"}
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold">{currentUser.averageRating}</span>
              </div>
              <p className="text-sm text-gray-600">Rating ({currentUser.totalRatings} reviews)</p>
            </div>
            <div className="text-center">
              <Badge className={currentUser.isAadhaarVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                <Shield className="w-3 h-3 mr-1" />
                {currentUser.isAadhaarVerified ? 'Verified' : 'Not Verified'}
              </Badge>
              <p className="text-sm text-gray-600 mt-1">Aadhaar Status</p>
            </div>
            <div className="text-center">
              <Badge className={currentUser.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {currentUser.subscriptionTier}
              </Badge>
              <p className="text-sm text-gray-600 mt-1">Subscription</p>
            </div>
            <div className="text-center">
              <span className="font-semibold">{currentUser.eventsAttended}</span>
              <p className="text-sm text-gray-600">Events Attended</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Services Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">My Services</h2>
        
        {myServices.length > 0 ? (
          <div className="grid gap-4">
            {myServices.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.type} • {service.price}</p>
                    </div>
                    <Badge className={service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {service.status}
                    </Badge>
                  </div>
                  
                  {service.applications.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Applications:</h4>
                      {service.applications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{app.clientName}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {app.date}
                              </span>
                              <span>{app.event}</span>
                            </div>
                            {app.userDetails && (
                              <UserDetailCard user={app.userDetails} />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusBadgeColor(app.status)}>
                              {app.status}
                            </Badge>
                            {app.status === 'pending' && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  onClick={() => handleServiceApplicationStatusChange(service.id, app.id, 'confirmed')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleServiceApplicationStatusChange(service.id, app.id, 'rejected')}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">You haven't created any services yet.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      {/* My Applications Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">My Applications</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="service">Services</SelectItem>
                <SelectItem value="event">Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          {getFilteredApplications().map((application) => (
            <Card key={application.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{application.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {application.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {application.date}
                      </span>
                      <span className="font-medium">{application.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusBadgeColor(application.status)}>
                      {application.status}
                    </Badge>
                    <Badge variant="outline">
                      {application.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredApplications().length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No applications found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      {/* Available Services & Events */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Services & Events</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Available Services */}
          <div>
            <h3 className="text-lg font-medium mb-3">Services</h3>
            <div className="space-y-3">
              {allServices.slice(0, 3).map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{service.title}</h4>
                        <p className="text-sm text-gray-600">{service.type} • {service.price}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs">{service.averageRating} ({service.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Available Events */}
          <div>
            <h3 className="text-lg font-medium mb-3">Events</h3>
            <div className="space-y-3">
              {allEvents.slice(0, 3).map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {event.date}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-green-600 mt-1">{event.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStatus;
