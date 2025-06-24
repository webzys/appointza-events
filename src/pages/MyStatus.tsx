import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, MapPin, Clock, Search, CheckCircle, XCircle, Users, Briefcase, Plus, Star, User, TrendingUp, Award, Camera, Crown, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import AppSidebar from "@/components/AppSidebar";
import AadhaarVerification from "@/components/AadhaarVerification";

// Mock data - in real app this would come from your backend
const mockApplications = [
  {
    id: 1,
    title: "Wedding Photography",
    type: "service",
    location: "Mumbai, Maharashtra",
    date: "2024-01-15",
    status: "pending",
    appliedDate: "2024-01-10",
    price: "₹25,000",
    description: "Professional wedding photography service for 2 days"
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
    description: "Looking for event coordinators"
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
    description: "DJ services for birthday celebration"
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
    description: "Corporate event management"
  }
];

const mockMyServices = [
  {
    id: 1,
    title: "Professional Photography",
    type: "Photography",
    bookings: 3,
    status: "active",
    price: "₹20,000",
    applications: [
      { id: 1, clientName: "Rohit Sharma", event: "Wedding", date: "2024-02-15", status: "pending" },
      { id: 2, clientName: "Priya Patel", event: "Engagement", date: "2024-02-20", status: "confirmed" },
      { id: 3, clientName: "Amit Kumar", event: "Birthday Party", date: "2024-02-25", status: "pending" }
    ]
  },
  {
    id: 2,
    title: "Event Coordination",
    type: "Event Management",
    bookings: 2,
    status: "active",
    price: "₹35,000",
    applications: [
      { id: 4, clientName: "Sneha Reddy", event: "Corporate Event", date: "2024-03-05", status: "confirmed" },
      { id: 5, clientName: "Rajesh Gupta", event: "Conference", date: "2024-03-15", status: "pending" }
    ]
  }
];

// Mock user analytics data
const userStats = {
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

const MyStatus = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isCreateServiceOpen, setIsCreateServiceOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [selectedServiceImage, setSelectedServiceImage] = useState<File | null>(null);
  const [selectedEventImage, setSelectedEventImage] = useState<File | null>(null);
  const [subscriptionType, setSubscriptionType] = useState("monthly");
  const { toast } = useToast();

  const serviceForm = useForm({
    defaultValues: {
      title: "",
      type: "",
      description: "",
      price: "",
      location: "",
      image: null
    }
  });

  const eventForm = useForm({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: "",
      location: "",
      date: "",
      image: null
    }
  });

  const handleServiceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedServiceImage(file);
    }
  };

  const handleEventImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedEventImage(file);
    }
  };

  const onCreateService = (data: any) => {
    console.log("Creating service:", data);
    console.log("Service image:", selectedServiceImage);
    toast({
      title: "Service Created",
      description: "Your service has been created successfully!",
    });
    setIsCreateServiceOpen(false);
    serviceForm.reset();
    setSelectedServiceImage(null);
  };

  const onCreateEvent = (data: any) => {
    console.log("Creating event:", data);
    console.log("Event image:", selectedEventImage);
    toast({
      title: "Event Created", 
      description: "Your event has been created successfully!",
    });
    setIsCreateEventOpen(false);
    eventForm.reset();
    setSelectedEventImage(null);
  };

  const handleSubscriptionChange = () => {
    toast({
      title: "Subscription Updated",
      description: `Subscription changed to ${subscriptionType} billing.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
      selected: { label: "Selected", className: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
      confirmed: { label: "Confirmed", className: "bg-green-100 text-green-800 hover:bg-green-200" },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-800 hover:bg-red-200" },
      active: { label: "Active", className: "bg-green-100 text-green-800 hover:bg-green-200" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const handleApproveReject = (applicationId: number, action: 'approve' | 'reject', clientName: string) => {
    toast({
      title: `Application ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `${clientName}'s application has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
    });
  };

  const handleAadhaarVerification = (verified: boolean) => {
    if (verified) {
      toast({
        title: "Identity Verified",
        description: "Your Aadhaar verification is complete. You can now access premium features.",
      });
    }
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesType = typeFilter === "all" || app.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex w-full">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <SidebarTrigger />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-1">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Status</h1>
                    <p className="text-gray-600">Track your applications and manage your service bookings</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <AadhaarVerification onVerificationComplete={handleAadhaarVerification} />
                    
                    <Dialog open={isCreateServiceOpen} onOpenChange={setIsCreateServiceOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Create Service
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Create New Service</DialogTitle>
                          <DialogDescription>
                            Add a new service to your portfolio
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...serviceForm}>
                          <form onSubmit={serviceForm.handleSubmit(onCreateService)} className="space-y-4">
                            <FormField
                              control={serviceForm.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Service Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Wedding Photography" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={serviceForm.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Service Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select service type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="photography">Photography</SelectItem>
                                      <SelectItem value="catering">Catering</SelectItem>
                                      <SelectItem value="decoration">Decoration</SelectItem>
                                      <SelectItem value="music">Music & DJ</SelectItem>
                                      <SelectItem value="coordination">Event Coordination</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div>
                              <FormLabel>Service Image</FormLabel>
                              <div className="mt-2">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleServiceImageChange}
                                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                />
                                {selectedServiceImage && (
                                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                    <Camera className="w-4 h-4" />
                                    {selectedServiceImage.name}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <FormField
                              control={serviceForm.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Describe your service..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={serviceForm.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price</FormLabel>
                                  <FormControl>
                                    <Input placeholder="₹25,000" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={serviceForm.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Mumbai, Maharashtra" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="flex justify-end gap-3 pt-4">
                              <Button type="button" variant="outline" onClick={() => setIsCreateServiceOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600">
                                Create Service
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Create Event
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Create New Event</DialogTitle>
                          <DialogDescription>
                            Organize a new event and find service providers
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...eventForm}>
                          <form onSubmit={eventForm.handleSubmit(onCreateEvent)} className="space-y-4">
                            <FormField
                              control={eventForm.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Event Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Tech Conference 2024" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={eventForm.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Event Category</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select event category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="wedding">Wedding</SelectItem>
                                      <SelectItem value="corporate">Corporate</SelectItem>
                                      <SelectItem value="conference">Conference</SelectItem>
                                      <SelectItem value="party">Party</SelectItem>
                                      <SelectItem value="cultural">Cultural</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div>
                              <FormLabel>Event Image</FormLabel>
                              <div className="mt-2">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleEventImageChange}
                                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {selectedEventImage && (
                                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                    <Camera className="w-4 h-4" />
                                    {selectedEventImage.name}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <FormField
                              control={eventForm.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Describe your event..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={eventForm.control}
                                name="date"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Event Date</FormLabel>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={eventForm.control}
                                name="price"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Budget</FormLabel>
                                    <FormControl>
                                      <Input placeholder="₹50,000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={eventForm.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Bangalore, Karnataka" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="flex justify-end gap-3 pt-4">
                              <Button type="button" variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600">
                                Create Event
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              {/* Content based on active tab */}
              {activeTab === "applications" && (
                <div>
                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="selected">Selected</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="event">Events</SelectItem>
                        <SelectItem value="service">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Applications Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredApplications.map((application) => (
                      <Card key={application.id} className="hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                              {application.title}
                            </CardTitle>
                            {getStatusBadge(application.status)}
                          </div>
                          <Badge variant="outline" className="w-fit">
                            {application.type === 'event' ? 'Event' : 'Service'}
                          </Badge>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-gray-600 text-sm line-clamp-2">{application.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                              {application.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                              {new Date(application.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-2 text-green-500" />
                              Applied: {new Date(application.appliedDate).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-lg text-orange-600">{application.price}</span>
                              {application.status === 'confirmed' && (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Booked
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredApplications.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Briefcase className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                      <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "services" && (
                <div className="space-y-6">
                  {mockMyServices.map((service) => (
                    <Card key={service.id} className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-blue-50 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl font-semibold text-gray-900">
                            {service.title}
                          </CardTitle>
                          {getStatusBadge(service.status)}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{service.type}</Badge>
                          <Badge className="bg-blue-100 text-blue-800">
                            {service.bookings} Bookings
                          </Badge>
                          <span className="font-semibold text-orange-600">{service.price}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <h4 className="font-medium text-gray-900 mb-4">Recent Applications</h4>
                        <div className="space-y-3">
                          {service.applications.map((app) => (
                            <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-900">{app.clientName}</span>
                                  {getStatusBadge(app.status)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">{app.event}</span> • {new Date(app.date).toLocaleDateString()}
                                </div>
                              </div>
                              {app.status === 'pending' && (
                                <div className="flex gap-2 ml-4">
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleApproveReject(app.id, 'approve', app.clientName)}
                                  >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => handleApproveReject(app.id, 'reject', app.clientName)}
                                  >
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {mockMyServices.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Users className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No services posted</h3>
                      <p className="text-gray-500">Start by posting your first service</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "profile" && (
                <div className="space-y-6">
                  {/* User Analytics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="text-center">
                      <CardHeader className="pb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-blue-600">{userStats.totalApplications}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 font-medium">Total Applications</p>
                      </CardContent>
                    </Card>

                    <Card className="text-center">
                      <CardHeader className="pb-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-green-600">{userStats.successfulApplications}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 font-medium">Successful Applications</p>
                      </CardContent>
                    </Card>

                    <Card className="text-center">
                      <CardHeader className="pb-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Calendar className="w-6 h-6 text-orange-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-orange-600">{userStats.eventsCreated}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 font-medium">Events Created</p>
                      </CardContent>
                    </Card>

                    <Card className="text-center">
                      <CardHeader className="pb-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-purple-600">{userStats.totalRequests}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 font-medium">Total Requests</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          Services Created
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.servicesCreated}</div>
                        <p className="text-gray-600">Active service listings</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-600" />
                          Rating
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-3xl font-bold text-yellow-600">{userStats.rating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= Math.floor(userStats.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">Based on client reviews</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Subscription Management */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-orange-600" />
                        Subscription Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-green-100 text-green-800">
                              {userStats.subscriptionStatus === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                            <span className="font-semibold text-gray-900">{userStats.subscriptionTier} Plan</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Expires on {new Date(userStats.subscriptionEnd).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Manage Billing
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <span className="font-medium text-gray-900">Billing Frequency:</span>
                          <Select value={subscriptionType} onValueChange={setSubscriptionType}>
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button onClick={handleSubscriptionChange} size="sm">
                            Update
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">
                            {subscriptionType === 'monthly' ? 'Monthly' : 'Yearly'} Cost:
                          </span>
                          <span className="text-xl font-bold text-orange-600">
                            ₹{subscriptionType === 'monthly' ? '200' : '2,000'}
                            <span className="text-sm text-gray-600">/{subscriptionType === 'monthly' ? 'month' : 'year'}</span>
                          </span>
                        </div>

                        {subscriptionType === 'yearly' && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-green-600" />
                              <span className="text-green-800 font-medium">Save ₹400 with yearly billing!</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MyStatus;
