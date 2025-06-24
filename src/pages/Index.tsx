import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Briefcase, Phone, Star, CheckCircle, Zap, Shield } from "lucide-react";
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

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-blue-50 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust Appointza for their events and services
              </p>
              
              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Quick Setup</h4>
                  <p className="text-sm text-gray-600">Get started in minutes with our intuitive platform</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Secure Platform</h4>
                  <p className="text-sm text-gray-600">Your data and payments are always protected</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                  <p className="text-sm text-gray-600">Expert help whenever you need it</p>
                </div>
              </div>
              
              {/* Pricing Card */}
              <div className="bg-gradient-to-r from-orange-500 to-blue-600 p-8 rounded-xl text-white mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-orange-100 mb-2">Start your journey today</p>
                    <div className="flex items-baseline justify-center md:justify-start">
                      <span className="text-sm text-orange-100">10-day free trial, then </span> 
                      <span className="text-4xl font-bold mx-2">₹200</span>
                      <span className="text-orange-100">/month</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3"
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                No credit card required • Cancel anytime • Full access during trial
              </p>
            </div>
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
