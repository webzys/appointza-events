import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import UserDetailCard from "@/components/UserDetailCard";
import { Calendar, MapPin, Users, Briefcase, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { User as ExtendedUser } from "@/types/models";

const MyStatus = () => {
  const { user } = useAuth();

  // Transform the auth user to match the extended User type expected by UserDetailCard
  const extendedUser: ExtendedUser | null = user ? {
    id: user.id,
    name: user.name,
    email: user.email || '',
    phone: user.phone || '',
    isAadhaarVerified: user.isAadhaarVerified,
    rating: 4.5, // Default values for demo
    totalRatings: 25,
    subscriptionStatus: user.subscriptionStatus as 'active' | 'inactive',
    subscriptionTier: user.subscriptionTier as 'Basic' | 'Premium', 
    subscriptionEnd: user.subscriptionEnd,
    eventsAttended: 12,
    eventsCancelled: 1,
    applicationsAccepted: 18,
    applicationsRejected: 7,
    totalApplications: 25,
    averageRating: 4.5,
    feedbackHistory: [],
    performanceStats: {
      totalJobs: 25,
      completedJobs: 23,
      cancelledJobs: 2,
      onTimePercentage: 92,
      qualityRating: 4.6,
      professionalismRating: 4.7,
      recommendationRate: 88,
      responsiveness: 4.5
    }
  } : null;

  const mockApplications = [
    {
      id: 1,
      title: "Tech Conference 2024",
      type: "Event",
      status: "Applied",
      appliedDate: "2024-01-15",
      location: "Bangalore, Karnataka",
      date: "Feb 20, 2024"
    },
    {
      id: 2,
      title: "Wedding Photography",
      type: "Service",
      status: "Contacted",
      appliedDate: "2024-01-10",
      location: "Mumbai, Maharashtra",
      price: "₹25,000"
    },
    {
      id: 3,
      title: "Digital Marketing Summit",
      type: "Event",
      status: "Confirmed",
      appliedDate: "2024-01-08",
      location: "Delhi, NCR",
      date: "Mar 5, 2024"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeTab="profile" onTabChange={() => {}} />
        <SidebarInset>
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
              <div className="flex h-16 items-center gap-4 px-6">
                <SidebarTrigger />
                <div className="flex items-center gap-3">
                  <img 
                    src="/lovable-uploads/a9606503-e70f-4f98-bfea-fa89d55f3ea3.png" 
                    alt="Logo" 
                    className="w-8 h-8"
                  />
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                    My Status
                  </h1>
                </div>
              </div>
            </header>

            <div className="p-6 space-y-6">
              {/* User Details Card */}
              {extendedUser && <UserDetailCard user={extendedUser} />}

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/events">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Browse Events</h3>
                          <p className="text-gray-600">Discover upcoming events</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/services">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                          <Briefcase className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Browse Services</h3>
                          <p className="text-gray-600">Find service providers</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* My Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="w-5 h-5" />
                    My Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockApplications.map((application) => (
                      <div key={application.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{application.title}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <Badge className="bg-gray-100 text-gray-800">
                                {application.type}
                              </Badge>
                              <Badge className={getStatusColor(application.status)}>
                                {application.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {application.location}
                          </div>
                          {application.date && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {application.date}
                            </div>
                          )}
                          {application.price && (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{application.price}</span>
                            </div>
                          )}
                          <div className="text-xs text-gray-500">
                            Applied on: {application.appliedDate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MyStatus;
