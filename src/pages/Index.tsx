
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Briefcase, Phone, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="/lovable-uploads/446dd874-f15b-4a19-b7e6-4c6840609b52.png" alt="Appointza" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Appointza.events
                </h1>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link to="/events">
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  All Events
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  All Services
                </Button>
              </Link>
              <Link to="/my-status">
                <Button variant="outline" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  My Status
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect. Create.{' '}
            <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              Celebrate.
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your one-stop platform for events and services. Browse, book, and manage everything seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700">
                Browse Events
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Appointza?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage events and services in one platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Events & Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse and book from thousands of events and professional services
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Easy Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track applications, manage bookings, and communicate seamlessly
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Trusted Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Secure payments, verified providers, and excellent customer support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Events */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Events & Services</h3>
            <p className="text-gray-600">Discover what's happening around you</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Event Cards */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">Wedding Photography</CardTitle>
                  <Badge className="bg-green-100 text-green-800">Service</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    Mumbai, Maharashtra
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    4.8 (124 reviews)
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-600">₹25,000</span>
                  <Link to="/service/1">
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">Tech Conference 2024</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">Event</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    Bangalore, Karnataka
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Feb 20, 2024
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-600">₹15,000</span>
                  <Link to="/event/1">
                    <Button size="sm">Apply Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">Event Coordination</CardTitle>
                  <Badge className="bg-green-100 text-green-800">Service</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    Delhi, NCR
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    4.9 (89 reviews)
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-600">₹35,000</span>
                  <Link to="/service/2">
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who trust Appointza for their events and services
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg inline-block">
            <p className="text-sm text-gray-500 mb-2">10-day free trial, then</p>
            <p className="text-3xl font-bold text-orange-600 mb-4">₹200/month</p>
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img className="h-8 w-8 mr-3" src="/lovable-uploads/446dd874-f15b-4a19-b7e6-4c6840609b52.png" alt="Appointza" />
            <span className="text-xl font-bold">Appointza.events</span>
          </div>
          <p className="text-gray-400 mb-4">
            Your trusted platform for events and services
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 Appointza. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
