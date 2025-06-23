
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, ArrowLeft, Phone, Camera, Users, Clock, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock service data - in real app this would come from your backend
const mockService = {
  id: 1,
  title: "Professional Wedding Photography",
  description: "Capture your special moments with stunning, professional wedding photography. I specialize in candid shots, traditional poses, and artistic compositions that tell your love story.",
  fullDescription: "With over 8 years of experience in wedding photography, I bring passion, creativity, and professionalism to every shoot. My style combines photojournalistic storytelling with fine art portraiture to create timeless images you'll treasure forever.\n\nWhat's included:\n• Pre-wedding consultation and planning\n• Full day coverage (12+ hours)\n• Second photographer for ceremony\n• 500+ edited high-resolution images\n• Online gallery for sharing\n• USB drive with all photos\n• Print release for personal use",
  provider: "Rajesh Kumar Photography",
  location: "Mumbai, Maharashtra",
  serviceArea: "Mumbai, Pune, Nashik, Goa",
  price: "₹25,000",
  originalPrice: "₹30,000",
  rating: 4.8,
  reviews: 124,
  completedJobs: 156,
  responseTime: "2 hours",
  category: "Photography",
  images: [
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ],
  tags: ["Wedding", "Photography", "Professional", "Candid"],
  packages: [
    {
      name: "Basic Package",
      price: "₹18,000",
      features: ["6 hours coverage", "300 edited photos", "Online gallery", "1 photographer"]
    },
    {
      name: "Standard Package",
      price: "₹25,000",
      features: ["12 hours coverage", "500 edited photos", "Online gallery", "2 photographers", "USB drive"]
    },
    {
      name: "Premium Package",
      price: "₹35,000",
      features: ["Full day coverage", "800+ edited photos", "Premium album", "2 photographers", "Video highlights", "Same day preview"]
    }
  ],
  reviews: [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2024-01-15",
      comment: "Absolutely amazing work! Rajesh captured our wedding beautifully. The photos are stunning and we couldn't be happier.",
      verified: true
    },
    {
      id: 2,
      name: "Amit Patel",
      rating: 5,
      date: "2024-01-10",
      comment: "Professional, creative, and so easy to work with. The candid shots are incredible. Highly recommend!",
      verified: true
    }
  ],
  equipment: ["Canon EOS R5", "Multiple lenses", "Professional lighting", "Backup equipment"],
  availability: "Available weekends and weekdays"
};

const ServiceDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBookNow = () => {
    const packageName = mockService.packages[selectedPackage].name;
    toast({
      title: "Booking Request Sent!",
      description: `Your booking request for ${packageName} has been sent to the service provider. They will contact you within ${mockService.responseTime}.`,
    });
  };

  const handleContact = () => {
    toast({
      title: "Contact Information",
      description: "Please call +91-9876543210 to discuss your requirements directly with the service provider.",
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
              Back to Services
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
            {/* Service Images */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={mockService.images[currentImageIndex]} 
                  alt={mockService.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-100 text-green-800">Service</Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {mockService.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      currentImageIndex === index ? 'ring-2 ring-orange-500' : ''
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Service Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{mockService.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {mockService.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {mockService.description}
              </p>
            </div>

            {/* Service Info */}
            <Card>
              <CardHeader>
                <CardTitle>Service Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-orange-500 mr-3" />
                    <div>
                      <p className="font-medium">Service Area</p>
                      <p className="text-gray-600">{mockService.serviceArea}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-gray-600">Usually responds in {mockService.responseTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium">Completed Jobs</p>
                      <p className="text-gray-600">{mockService.completedJobs} projects</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                    <div>
                      <p className="font-medium">Availability</p>
                      <p className="text-gray-600">{mockService.availability}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Details */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      {mockService.fullDescription.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Equipment Used</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {mockService.equipment.map((item, index) => (
                          <div key={index} className="flex items-center text-gray-600">
                            <Camera className="w-4 h-4 text-orange-500 mr-2" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="packages" className="mt-6">
                <div className="space-y-4">
                  {mockService.packages.map((pkg, index) => (
                    <Card 
                      key={index} 
                      className={`cursor-pointer transition-all ${
                        selectedPackage === index ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedPackage(index)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{pkg.name}</CardTitle>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-orange-600">{pkg.price}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {mockService.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{review.name}</p>
                                {review.verified && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                                )}
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                                <span className="text-sm text-gray-500 ml-2">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 line-through">{mockService.originalPrice}</p>
                    <p className="text-2xl font-bold text-orange-600">{mockService.packages[selectedPackage].price}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{mockService.rating}</span>
                    <span className="text-gray-500 ml-1">({mockService.reviews.length})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    Selected: {mockService.packages[selectedPackage].name}
                  </p>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Response time: {mockService.responseTime}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service Provider */}
            <Card>
              <CardHeader>
                <CardTitle>Service Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div>
                    <p className="font-medium">{mockService.provider}</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-500">{mockService.rating} ({mockService.completedJobs} jobs)</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Location & Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Based in {mockService.location}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Serves: {mockService.serviceArea}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
