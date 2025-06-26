
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star, Users, Briefcase, ArrowRight, Shield, Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const featuredServices = [
    {
      id: 1,
      title: "Professional Wedding Photography",
      provider: "Priya Sharma",
      rating: 4.9,
      reviews: 124,
      price: "₹25,000",
      location: "Mumbai, Maharashtra",
      verified: true,
      image: "/lovable-uploads/446dd874-f15b-4a19-b7e6-4c6840609b52.png"
    },
    {
      id: 2,
      title: "Premium Catering Services",
      provider: "Rajesh Kumar",
      rating: 4.8,
      reviews: 89,
      price: "₹850/person",
      location: "Delhi, NCR",
      verified: true,
      premium: true
    },
    {
      id: 3,
      title: "Event Decoration & Setup",
      provider: "Creative Designs",
      rating: 4.7,
      reviews: 156,
      price: "₹15,000",
      location: "Bangalore, Karnataka",
      verified: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      organizer: "TechCorp India",
      date: "2024-03-15",
      location: "Pune, Maharashtra",
      budget: "₹2,50,000",
      category: "Corporate"
    },
    {
      id: 2,
      title: "Spring Wedding Celebration",
      organizer: "The Sharma Family",
      date: "2024-04-20",
      location: "Jaipur, Rajasthan",
      budget: "₹5,00,000",
      category: "Wedding"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/a9606503-e70f-4f98-bfea-fa89d55f3ea3.png" 
                alt="Logo" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                  EventConnect
                </h1>
                <p className="text-xs text-gray-500">Connect. Celebrate. Create.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Link to="/my-status">
                  <Button className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Button variant="ghost" onClick={handleLoginClick}>
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleLoginClick}
                    className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect with the Best
            <span className="block bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              Event Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find trusted service providers for your events or offer your services to event organizers. 
            From weddings to corporate events, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <Calendar className="w-5 h-5 mr-2" />
                Find Events
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-orange-200 hover:bg-orange-50">
                <Users className="w-5 h-5 mr-2" />
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Services</h2>
              <p className="text-gray-600">Discover top-rated service providers for your next event</p>
            </div>
            <Link to="/services">
              <Button variant="outline" className="flex items-center gap-2">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 relative">
                  {service.image && (
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {service.verified && (
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Verified
                      </Badge>
                    )}
                    {service.premium && (
                      <Badge className="bg-orange-100 text-orange-800 flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{service.provider}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-sm text-gray-500">({service.reviews})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {service.location}
                    </div>
                    <span className="font-semibold text-orange-600">{service.price}</span>
                  </div>
                  <Button className="w-full" variant="outline" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600">Join exciting events or offer your services</p>
            </div>
            <Link to="/events">
              <Button variant="outline" className="flex items-center gap-2">
                View All Events
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>
                  <CardDescription>{event.organizer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-3 text-blue-500" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-3 text-orange-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-semibold text-lg text-green-600">{event.budget}</span>
                      <Button size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of event organizers and service providers who trust our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100"
              onClick={handleLoginClick}
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Start as Service Provider
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-orange-600"
              onClick={handleLoginClick}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Plan Your Event
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <img 
              src="/lovable-uploads/a9606503-e70f-4f98-bfea-fa89d55f3ea3.png" 
              alt="Logo" 
              className="w-10 h-10"
            />
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                EventConnect
              </h3>
              <p className="text-sm text-gray-400">Connect. Celebrate. Create.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">For Event Organizers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/events" className="hover:text-white">Find Services</Link></li>
                <li><Link to="/login" className="hover:text-white">Post Event</Link></li>
                <li><Link to="/login" className="hover:text-white">Manage Bookings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Service Providers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/services" className="hover:text-white">Browse Events</Link></li>
                <li><Link to="/login" className="hover:text-white">List Services</Link></li>
                <li><Link to="/login" className="hover:text-white">Grow Business</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EventConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
