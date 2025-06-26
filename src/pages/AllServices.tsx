import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Search, Filter, ArrowLeft, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AllServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleContactClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Handle contact logic here
      console.log('User is authenticated, proceed with contact');
    }
  };

  const mockServices = [
    {
      id: 1,
      title: "Wedding Photography",
      provider: "John Photography Studio",
      location: "Mumbai, Maharashtra",
      price: "₹25,000",
      originalPrice: "₹30,000",
      rating: 4.8,
      reviews: 124,
      category: "Photography",
      description: "Professional wedding photography with 10+ years experience."
    },
    {
      id: 2,
      title: "Event Coordination",
      provider: "Elite Events",
      location: "Delhi, NCR",
      price: "₹35,000",
      rating: 4.9,
      reviews: 89,
      category: "Event Management",
      description: "Complete event planning and coordination services."
    },
    {
      id: 3,
      title: "Catering Services",
      provider: "Royal Caterers",
      location: "Bangalore, Karnataka",
      price: "₹450/plate",
      rating: 4.7,
      reviews: 156,
      category: "Catering",
      description: "Multi-cuisine catering for all types of events."
    },
    {
      id: 4,
      title: "DJ & Sound System",
      provider: "Beat Masters",
      location: "Pune, Maharashtra",
      price: "₹15,000",
      rating: 4.6,
      reviews: 78,
      category: "Entertainment",
      description: "Professional DJ services with premium sound equipment."
    },
    {
      id: 5,
      title: "Decoration & Setup",
      provider: "Dream Decorators",
      location: "Chennai, Tamil Nadu",
      price: "₹20,000",
      rating: 4.8,
      reviews: 92,
      category: "Decoration",
      description: "Beautiful event decorations and stage setup."
    },
    {
      id: 6,
      title: "Video Production",
      provider: "Cinematic Studios",
      location: "Hyderabad, Telangana",
      price: "₹40,000",
      rating: 4.9,
      reviews: 67,
      category: "Video Production",
      description: "Professional video production and editing services."
    }
  ];

  const filteredServices = mockServices.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Link>
              <div className="flex items-center">
                <img className="h-8 w-8" src="/lovable-uploads/446dd874-f15b-4a19-b7e6-4c6840609b52.png" alt="EventConnect" />
                <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  All Services
                </h1>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link to="/events">
                <Button variant="outline" size="sm">All Events</Button>
              </Link>
              {isAuthenticated ? (
                <Link to="/my-status">
                  <Button variant="outline" size="sm">My Status</Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search services by name, provider, location, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredServices.length} of {mockServices.length} services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <Badge className="bg-green-100 text-green-800">Service</Badge>
                </div>
                <p className="text-sm text-gray-600">{service.provider}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {service.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    {service.rating} ({service.reviews} reviews)
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    {service.category}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-bold text-orange-600">{service.price}</span>
                    {service.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{service.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/service/${service.id}`}>
                      <Button size="sm" variant="outline">View Details</Button>
                    </Link>
                    <Button size="sm" onClick={handleContactClick}>
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
