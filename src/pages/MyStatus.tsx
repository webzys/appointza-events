
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Users, Briefcase, Phone, Plus, Edit, Trash2, Star, CheckCircle, Clock, DollarSign, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { dataService } from "@/services/dataService";
import { User, Event, Service, Application, UserStats } from "@/types/models";
import AadhaarVerification from "@/components/AadhaarVerification";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

const MyStatus = () => {
  const { user, login } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    budget: '',
    requirements: ''
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    availability: ''
  });

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.id) {
        setError('User not authenticated');
        return;
      }

      // Load current user data
      const userData = await dataService.getCurrentUser();
      setCurrentUser(userData);

      // Load user's events, services, applications, and stats
      const [userEvents, userServices, userApplications, stats] = await Promise.all([
        dataService.getEvents(user.id),
        dataService.getServices(user.id),
        dataService.getApplications(user.id),
        dataService.getUserStats()
      ]);

      setEvents(userEvents);
      setServices(userServices);
      setApplications(userApplications);
      setUserStats(stats);

    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      if (!currentUser?.id) return;

      const newEvent = await dataService.createEvent({
        title: eventForm.title,
        description: eventForm.description,
        date: eventForm.date,
        time: eventForm.time,
        location: eventForm.location,
        budget: eventForm.budget,
        requirements: eventForm.requirements,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        category: 'general',
        price: eventForm.budget,
        status: 'active'
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
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event');
    }
  };

  const handleCreateService = async () => {
    try {
      if (!currentUser?.id) return;

      const newService = await dataService.createService({
        title: serviceForm.title,
        description: serviceForm.description,
        type: serviceForm.category,
        price: serviceForm.price,
        location: serviceForm.location,
        availability: serviceForm.availability,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        images: [],
        tags: [],
        isActive: true,
        bookings: 0,
        status: 'active'
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
    } catch (err) {
      console.error('Error creating service:', err);
      setError('Failed to create service');
    }
  };

  const handleVerificationComplete = async (verified: boolean) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, isAadhaarVerified: verified };
      setCurrentUser(updatedUser);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage 
          title="Dashboard Error"
          message={error}
          onRetry={loadUserData}
        />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Please log in to access your dashboard.</p>
            <Link to="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img className="h-8 w-8" src="/lovable-uploads/446dd874-f15b-4a19-b7e6-4c6840609b52.png" alt="Appointza" />
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Appointza.events
                </span>
              </Link>
            </div>
            <nav className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/events">
                <Button variant="ghost">Events</Button>
              </Link>
              <Link to="/services">
                <Button variant="ghost">Services</Button>
              </Link>
              <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                  <p className="text-gray-600">{currentUser.email}</p>
                  <p className="text-gray-600">{currentUser.phone}</p>
                </div>
                <div className="text-right">
                  <Badge variant={currentUser.isAadhaarVerified ? "default" : "secondary"}>
                    {currentUser.isAadhaarVerified ? "Verified" : "Unverified"}
                  </Badge>
                  {!currentUser.isAadhaarVerified && (
                    <div className="mt-2">
                      <AadhaarVerification 
                        onVerificationComplete={handleVerificationComplete}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        {userStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold">{userStats.totalApplications}</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Successful Applications</p>
                    <p className="text-2xl font-bold">{userStats.successfulApplications}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Events Created</p>
                    <p className="text-2xl font-bold">{userStats.eventsCreated}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Services Created</p>
                    <p className="text-2xl font-bold">{userStats.servicesCreated}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No applications yet</p>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{application.title}</h4>
                            <p className="text-sm text-gray-600">{application.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Applied on {new Date(application.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={
                            application.status === 'confirmed' ? 'default' :
                            application.status === 'rejected' ? 'destructive' :
                            application.status === 'selected' ? 'default' : 'secondary'
                          }>
                            {application.status}
                          </Badge>
                        </div>
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
                <CardTitle>My Events</CardTitle>
              </CardHeader>
              <CardContent>
                {events.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No events created yet</p>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold">{event.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {event.price}
                              </span>
                            </div>
                            {event.requirements && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">
                                  <strong>Requirements:</strong> {event.requirements}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/event/${event.id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
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
                <CardTitle>My Services</CardTitle>
              </CardHeader>
              <CardContent>
                {services.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No services created yet</p>
                ) : (
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold">{service.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {service.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {service.price}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {service.location}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={service.status === 'active' ? "default" : "secondary"}>
                              {service.status === 'active' ? "Active" : "Inactive"}
                            </Badge>
                            <Link to={`/service/${service.id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create New Tab */}
          <TabsContent value="create">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Create Event */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="event-title">Title</Label>
                    <Input
                      id="event-title"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      placeholder="Event title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea
                      id="event-description"
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      placeholder="Event description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-date">Date</Label>
                      <Input
                        id="event-date"
                        type="date"
                        value={eventForm.date}
                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-time">Time</Label>
                      <Input
                        id="event-time"
                        type="time"
                        value={eventForm.time}
                        onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="event-location">Location</Label>
                    <Input
                      id="event-location"
                      value={eventForm.location}
                      onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      placeholder="Event location"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="event-budget">Budget</Label>
                    <Input
                      id="event-budget"
                      value={eventForm.budget}
                      onChange={(e) => setEventForm({ ...eventForm, budget: e.target.value })}
                      placeholder="Event budget"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="event-requirements">Requirements</Label>
                    <Textarea
                      id="event-requirements"
                      value={eventForm.requirements}
                      onChange={(e) => setEventForm({ ...eventForm, requirements: e.target.value })}
                      placeholder="Special requirements"
                    />
                  </div>
                  
                  <Button onClick={handleCreateEvent} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </CardContent>
              </Card>

              {/* Create Service */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="service-title">Title</Label>
                    <Input
                      id="service-title"
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      placeholder="Service title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="service-description">Description</Label>
                    <Textarea
                      id="service-description"
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      placeholder="Service description"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="service-category">Category</Label>
                    <Select value={serviceForm.category} onValueChange={(value) => setServiceForm({ ...serviceForm, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="catering">Catering</SelectItem>
                        <SelectItem value="decoration">Decoration</SelectItem>
                        <SelectItem value="music">Music & DJ</SelectItem>
                        <SelectItem value="venue">Venue</SelectItem>
                        <SelectItem value="planning">Event Planning</SelectItem>
                        <SelectItem value="transport">Transportation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="service-price">Price</Label>
                    <Input
                      id="service-price"
                      value={serviceForm.price}
                      onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                      placeholder="Service pricing"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="service-location">Location</Label>
                    <Input
                      id="service-location"
                      value={serviceForm.location}
                      onChange={(e) => setServiceForm({ ...serviceForm, location: e.target.value })}
                      placeholder="Service location"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="service-availability">Availability</Label>
                    <Input
                      id="service-availability"
                      value={serviceForm.availability}
                      onChange={(e) => setServiceForm({ ...serviceForm, availability: e.target.value })}
                      placeholder="Available days/times"
                    />
                  </div>
                  
                  <Button onClick={handleCreateService} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Service
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyStatus;
