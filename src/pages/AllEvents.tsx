import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Search, Filter, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AllEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Handle application logic here
      console.log('User is authenticated, proceed with application');
    }
  };

  const mockEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      location: "Bangalore, Karnataka",
      date: "Feb 20, 2024",
      price: "₹15,000",
      category: "Technology",
      attendees: 500,
      description: "Join industry leaders for the biggest tech conference of the year."
    },
    {
      id: 2,
      title: "Digital Marketing Summit",
      location: "Mumbai, Maharashtra",
      date: "Mar 5, 2024",
      price: "₹8,000",
      category: "Marketing",
      attendees: 300,
      description: "Learn the latest digital marketing strategies and trends."
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      location: "Delhi, NCR",
      date: "Feb 28, 2024",
      price: "₹5,000",
      category: "Business",
      attendees: 200,
      description: "Present your startup idea to top investors and win funding."
    },
    {
      id: 4,
      title: "Design Workshop",
      location: "Pune, Maharashtra",
      date: "Mar 10, 2024",
      price: "₹12,000",
      category: "Design",
      attendees: 150,
      description: "Hands-on workshop on modern UI/UX design principles."
    },
    {
      id: 5,
      title: "Music Festival",
      location: "Goa",
      date: "Mar 15, 2024",
      price: "₹20,000",
      category: "Entertainment",
      attendees: 1000,
      description: "Three days of non-stop music with top artists."
    },
    {
      id: 6,
      title: "Food & Culture Fair",
      location: "Chennai, Tamil Nadu",
      date: "Apr 2, 2024",
      price: "₹3,000",
      category: "Cultural",
      attendees: 800,
      description: "Experience diverse cuisines and cultural performances."
    }
  ];

  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
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
                  All Events
                </h1>
              </div>
            </div>
            
            <nav className="flex items-center space-x-4">
              <Link to="/services">
                <Button variant="outline" size="sm">All Services</Button>
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
                placeholder="Search events by name, location, or category..."
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
            Showing {filteredEvents.length} of {mockEvents.length} events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">Event</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    {event.attendees} attendees
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-600">{event.price}</span>
                  <div className="flex gap-2">
                    <Link to={`/event/${event.id}`}>
                      <Button size="sm" variant="outline">View Details</Button>
                    </Link>
                    <Button size="sm" onClick={handleApplyClick}>
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
