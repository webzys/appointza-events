
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Clock, Search, Filter, CheckCircle, XCircle, Users, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const MyStatus = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { toast } = useToast();

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

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesType = typeFilter === "all" || app.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Status</h1>
          <p className="text-gray-600">Track your applications and manage your service bookings</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              My Applications
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              My Services
            </TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications">
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
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
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
            </div>

            {mockMyServices.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services posted</h3>
                <p className="text-gray-500">Start by posting your first service</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyStatus;
