
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Calendar, 
  MapPin, 
  Star, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign,
  Plus,
  Edit,
  Shield,
  Award,
  Users,
  FileText,
  Activity
} from "lucide-react";
import { dataService } from "@/services/dataService";
import { User as UserType, UserStats, Application, Service, Event } from "@/types/models";
import UserDetailCard from "@/components/UserDetailCard";
import AadhaarVerification from "@/components/AadhaarVerification";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

const MyStatus = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [showCreateService, setShowCreateService] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  // Service form state
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    availability: ''
  });

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    budget: '',
    requirements: ''
  });

  // Load data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [user, stats, userApplications, userServices] = await Promise.all([
        dataService.getCurrentUser(),
        dataService.getUserStats(),
        dataService.getApplications(undefined), // We'll filter client-side
        dataService.getServices(undefined) // We'll filter client-side
      ]);

      setCurrentUser(user);
      setUserStats(stats);
      
      // Filter applications for current user
      const filteredApplications = userApplications.filter(app => app.userId === user.id);
      setApplications(filteredApplications);
      
      // Filter services for current user
      const filteredServices = userServices.filter(service => service.ownerId === user.id);
      setServices(filteredServices);
      
      // Load events for current user
      const userEvents = dataService.getEvents(user.id);
      setEvents(userEvents);

    } catch (err) {
      console.error('Failed to load user data:', err);
      setError('Failed to load user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = () => {
    if (!currentUser) return;

    try {
      const newService = dataService.createService({
        title: serviceForm.title,
        description: serviceForm.description,
        category: serviceForm.category,
        price: serviceForm.price,
        location: serviceForm.location,
        availability: serviceForm.availability,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        images: [],
        tags: [],
        isActive: true
      });

      setServices([...services, newService]);
      setServiceForm({
        title: '',
        description: '',
        category: '',
        price: '',
        location: '',
        availability: ''
      });
      setShowCreateService(false);
    } catch (err) {
      console.error('Failed to create service:', err);
      setError('Failed to create service. Please try again.');
    }
  };

  const handleCreateEvent = () => {
    if (!currentUser) return;

    try {
      const newEvent = dataService.createEvent({
        title: eventForm.title,
        description: eventForm.description,
        date: eventForm.date,
        time: eventForm.time,
        location: eventForm.location,
        budget: eventForm.budget,
        requirements: eventForm.requirements,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        status: 'active',
        category: 'general'
      });

      setEvents([...events, newEvent]);
      setEventForm({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        budget: '',
        requirements: ''
      });
      setShowCreateEvent(false);
    } catch (err) {
      console.error('Failed to create event:', err);
      setError('Failed to create event. Please try again.');
    }
  };

  const handleApplicationAction = async (applicationId: number, action: 'approve' | 'reject') => {
    try {
      const status = action === 'approve' ? 'confirmed' : 'rejected';
      await dataService.updateApplicationStatus(applicationId, status);
      
      // Refresh applications
      await loadUserData();
    } catch (err) {
      console.error(`Failed to ${action} application:`, err);
      setError(`Failed to ${action} application. Please try again.`);
    }
  };

  const handleServiceApplicationAction = (serviceId: number, applicationId: number, action: 'approve' | 'reject') => {
    try {
      const status = action === 'approve' ? 'confirmed' : 'rejected';
      dataService.updateServiceApplicationStatus(serviceId, applicationId, status);
      
      // Refresh services
      loadUserData();
    } catch (err) {
      console.error(`Failed to ${action} service application:`, err);
      setError(`Failed to ${action} service application. Please try again.`);
    }
  };

  const handleVerificationComplete = async (verified: boolean) => {
    try {
      const updatedUser = await dataService.updateUserVerification(verified);
      setCurrentUser(updatedUser);
    } catch (err) {
      console.error('Failed to update verification status:', err);
      setError('Failed to update verification status. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'selected': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} onRetry={loadUserData} />
      </div>
    );
  }

  if (!currentUser || !userStats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message="Failed to load user data" onRetry={loadUserData} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your profile, services, and applications</p>
        </div>
        <div className="flex items-center gap-4">
          {!currentUser.isAadhaarVerified && (
            <AadhaarVerification 
              onVerificationComplete={handleVerificationComplete}
              currentUser={currentUser}
            />
          )}
          <Badge className={`${currentUser.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {userStats.subscriptionTier}
          </Badge>
        </div>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                {currentUser.isAadhaarVerified && (
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(userStats.rating)}
                  <span className="font-medium ml-1">{userStats.rating}</span>
                </div>
                <span className="text-gray-500">({currentUser.totalRatings} reviews)</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.totalApplications}</div>
              <div className="text-sm text-gray-600">Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.successfulApplications}</div>
              <div className="text-sm text-gray-600">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userStats.eventsCreated}</div>
              <div className="text-sm text-gray-600">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{userStats.totalRequests}</div>
              <div className="text-sm text-gray-600">Requests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{userStats.servicesCreated}</div>
              <div className="text-sm text-gray-600">Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{userStats.rating}/5</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Subscription Status</h3>
                <p className="text-sm text-gray-600">
                  {userStats.subscriptionStatus === 'active' ? 'Active' : 'Inactive'} - {userStats.subscriptionTier}
                </p>
                {userStats.subscriptionEnd && (
                  <p className="text-xs text-gray-500">
                    Expires: {new Date(userStats.subscriptionEnd).toLocaleDateString()}
                  </p>
                )}
              </div>
              <Button variant="outline" size="sm">
                Manage Subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            My Applications
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            My Services
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            My Events
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <p className="text-gray-600">Track your application status</p>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No applications yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{application.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {application.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(application.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {application.price}
                            </span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{application.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                        <span className="capitalize">{application.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Services</CardTitle>
                  <p className="text-gray-600">Manage your offered services</p>
                </div>
                <Dialog open={showCreateService} onOpenChange={setShowCreateService}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Service</DialogTitle>
                      <DialogDescription>
                        Add a new service to your profile
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="service-title">Title</Label>
                        <Input
                          id="service-title"
                          value={serviceForm.title}
                          onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                          placeholder="Service title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-description">Description</Label>
                        <Textarea
                          id="service-description"
                          value={serviceForm.description}
                          onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                          placeholder="Describe your service"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="service-category">Category</Label>
                          <Select value={serviceForm.category} onValueChange={(value) => setServiceForm({...serviceForm, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="photography">Photography</SelectItem>
                              <SelectItem value="catering">Catering</SelectItem>
                              <SelectItem value="decoration">Decoration</SelectItem>
                              <SelectItem value="music">Music</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="service-price">Price</Label>
                          <Input
                            id="service-price"
                            value={serviceForm.price}
                            onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                            placeholder="₹5000"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="service-location">Location</Label>
                        <Input
                          id="service-location"
                          value={serviceForm.location}
                          onChange={(e) => setServiceForm({...serviceForm, location: e.target.value})}
                          placeholder="Service location"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-availability">Availability</Label>
                        <Input
                          id="service-availability"
                          value={serviceForm.availability}
                          onChange={(e) => setServiceForm({...serviceForm, availability: e.target.value})}
                          placeholder="Available weekends"
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleCreateService} className="flex-1">
                          Create Service
                        </Button>
                        <Button variant="outline" onClick={() => setShowCreateService(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {services.length === 0 ? (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No services created yet</p>
                  <Button 
                    onClick={() => setShowCreateService(true)}
                    className="mt-4"
                  >
                    Create Your First Service
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {services.map((service) => (
                    <div key={service.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {service.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {service.price}
                            </span>
                            <div className="flex items-center gap-1">
                              {renderStars(service.averageRating)}
                              <span className="ml-1">{service.averageRating}</span>
                              <span className="text-gray-500">({service.totalReviews})</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {service.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{service.description}</p>
                      
                      {service.applications.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">Applications ({service.applications.length})</h4>
                          <div className="space-y-3">
                            {service.applications.map((app) => (
                              <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {app.clientName.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-medium">{app.clientName}</p>
                                    <p className="text-sm text-gray-600">{app.event}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(app.status)}>
                                    {app.status}
                                  </Badge>
                                  {app.status === 'pending' && (
                                    <div className="flex gap-1">
                                      <Button
                                        size="sm"
                                        onClick={() => handleServiceApplicationAction(service.id, app.id, 'approve')}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleServiceApplicationAction(service.id, app.id, 'reject')}
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                      >
                                        <XCircle className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Events</CardTitle>
                  <p className="text-gray-600">Events you've created</p>
                </div>
                <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Event</DialogTitle>
                      <DialogDescription>
                        Post a new event and find service providers
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="event-title">Event Title</Label>
                        <Input
                          id="event-title"
                          value={eventForm.title}
                          onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                          placeholder="Event title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-description">Description</Label>
                        <Textarea
                          id="event-description"
                          value={eventForm.description}
                          onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                          placeholder="Describe your event"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="event-date">Date</Label>
                          <Input
                            id="event-date"
                            type="date"
                            value={eventForm.date}
                            onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="event-time">Time</Label>
                          <Input
                            id="event-time"
                            type="time"
                            value={eventForm.time}
                            onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="event-location">Location</Label>
                        <Input
                          id="event-location"
                          value={eventForm.location}
                          onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                          placeholder="Event location"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-budget">Budget</Label>
                        <Input
                          id="event-budget"
                          value={eventForm.budget}
                          onChange={(e) => setEventForm({...eventForm, budget: e.target.value})}
                          placeholder="₹10000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-requirements">Requirements</Label>
                        <Textarea
                          id="event-requirements"
                          value={eventForm.requirements}
                          onChange={(e) => setEventForm({...eventForm, requirements: e.target.value})}
                          placeholder="Special requirements"
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleCreateEvent} className="flex-1">
                          Create Event
                        </Button>
                        <Button variant="outline" onClick={() => setShowCreateEvent(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No events created yet</p>
                  <Button 
                    onClick={() => setShowCreateEvent(true)}
                    className="mt-4"
                  >
                    Create Your First Event
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {event.budget}
                            </span>
                          </div>
                        </div>
                        <Badge className={event.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-gray-700">{event.description}</p>
                      {event.requirements && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-800">Requirements:</p>
                          <p className="text-sm text-gray-600">{event.requirements}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Success Rate:</span>
                    <span className="font-medium">{Math.round((userStats.successfulApplications / Math.max(userStats.totalApplications, 1)) * 100)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(userStats.rating)}
                      <span className="font-medium ml-1">{userStats.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Services:</span>
                    <span className="font-medium">{services.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Events:</span>
                    <span className="font-medium">{events.filter(e => e.status === 'active').length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-center gap-3 p-2 rounded border">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{app.title}</p>
                        <p className="text-xs text-gray-600">{new Date(app.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <Badge className={getStatusColor(app.status)} size="sm">
                        {app.status}
                      </Badge>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <p className="text-gray-600 text-center py-4">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyStatus;
