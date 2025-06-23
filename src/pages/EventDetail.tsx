
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Star, ArrowLeft, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock event data - in real app this would come from your backend
const mockEvent = {
  id: 1,
  title: "Tech Conference 2024",
  description: "Join us for the biggest tech conference of the year! Connect with industry leaders, learn about cutting-edge technologies, and network with fellow professionals. This event features keynote speakers, panel discussions, workshops, and networking sessions.",
  longDescription: "Our annual Tech Conference brings together the brightest minds in technology to share insights, showcase innovations, and discuss the future of tech. With over 50 speakers, 20 workshops, and countless networking opportunities, this is the premier event for tech professionals.\n\nWhat to expect:\n• Keynote speeches from industry leaders\n• Interactive workshops and hands-on sessions\n• Networking lunch and coffee breaks\n• Exhibition area with latest tech products\n• Career fair with top tech companies",
  location: "Bangalore, Karnataka",
  venue: "Bangalore International Exhibition Centre",
  date: "2024-02-20",
  time: "09:00 AM - 06:00 PM",
  price: "₹15,000",
  category: "Technology",
  organizer: "TechEvents India",
  capacity: 500,
  registered: 342,
  rating: 4.8,
  reviews: 156,
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  tags: ["Technology", "Networking", "Conference", "Innovation"],
  requirements: [
    "Laptop for workshop sessions",
    "Business cards for networking",
    "Professional attire recommended"
  ],
  agenda: [
    { time: "09:00 AM", title: "Registration & Welcome Coffee" },
    { time: "10:00 AM", title: "Opening Keynote: Future of AI" },
    { time: "11:30 AM", title: "Panel Discussion: Startup Ecosystem" },
    { time: "01:00 PM", title: "Networking Lunch" },
    { time: "02:30 PM", title: "Technical Workshops" },
    { time: "04:00 PM", title: "Career Fair & Exhibitions" },
    { time: "05:30 PM", title: "Closing Remarks" }
  ]
};

const EventDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const handleApply = () => {
    toast({
      title: "Application Submitted!",
      description: "Your application has been submitted successfully. You'll receive a confirmation email shortly.",
    });
  };

  const handleContact = () => {
    toast({
      title: "Contact Information",
      description: "Please call +91-9876543210 for more details about this event.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Events
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleContact} className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={mockEvent.image} 
                alt={mockEvent.title}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-100 text-blue-800">Event</Badge>
              </div>
            </div>

            {/* Event Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{mockEvent.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {mockEvent.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {mockEvent.description}
              </p>
            </div>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-gray-600">{new Date(mockEvent.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-gray-600">{mockEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-orange-500 mr-3" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{mockEvent.venue}</p>
                      <p className="text-sm text-gray-500">{mockEvent.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-purple-500 mr-3" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-gray-600">{mockEvent.registered}/{mockEvent.capacity} registered</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Event */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {mockEvent.longDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agenda */}
            <Card>
              <CardHeader>
                <CardTitle>Event Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockEvent.agenda.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium min-w-fit">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>What to Bring</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockEvent.requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-orange-600">{mockEvent.price}</CardTitle>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{mockEvent.rating}</span>
                    <span className="text-gray-500 ml-1">({mockEvent.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    {mockEvent.capacity - mockEvent.registered} spots remaining
                  </p>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{width: `${(mockEvent.registered / mockEvent.capacity) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700"
                  onClick={handleApply}
                >
                  Apply Now
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Free cancellation up to 24 hours before event
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Organized by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <div>
                    <p className="font-medium">{mockEvent.organizer}</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-500">4.9 (89 events)</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Share Event */}
            <Card>
              <CardHeader>
                <CardTitle>Share Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">WhatsApp</Button>
                  <Button variant="outline" size="sm">Twitter</Button>
                  <Button variant="outline" size="sm">Facebook</Button>
                  <Button variant="outline" size="sm">Copy Link</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
