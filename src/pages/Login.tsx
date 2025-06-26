
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Loader2, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [emailCredentials, setEmailCredentials] = useState({ email: '', password: '' });
  const [mobileCredentials, setMobileCredentials] = useState({ phone: '', otp: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(emailCredentials.email, emailCredentials.password);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate('/my-status');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!mobileCredentials.phone) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOtpSent(true);
    setIsLoading(false);
    
    toast({
      title: "OTP Sent",
      description: "A 6-digit OTP has been sent to your phone. Use 123456 for demo.",
    });
  };

  const handleMobileLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(mobileCredentials.phone, undefined, mobileCredentials.otp);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate('/my-status');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid phone number or OTP",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoUsers = [
    {
      name: "John Doe (Basic User)",
      email: "john@example.com",
      phone: "+91 9876543210",
      type: "No Aadhaar verification",
      color: "bg-gray-100 text-gray-800"
    },
    {
      name: "Priya Sharma (Verified User)",
      email: "priya.verified@example.com", 
      phone: "+91 9876543211",
      type: "Aadhaar verified, basic subscription",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Rajesh Kumar (Premium User)",
      email: "rajesh.premium@example.com",
      phone: "+91 9876543212", 
      type: "Fully verified, premium subscription",
      color: "bg-orange-100 text-orange-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <img 
            src="/lovable-uploads/a9606503-e70f-4f98-bfea-fa89d55f3ea3.png" 
            alt="Logo" 
            className="w-20 h-20 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">Sign in to access your account</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={emailCredentials.email}
                      onChange={(e) => setEmailCredentials({...emailCredentials, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={emailCredentials.password}
                        onChange={(e) => setEmailCredentials({...emailCredentials, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Sign In with Email
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="mobile">
                <form onSubmit={handleMobileLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={mobileCredentials.phone}
                      onChange={(e) => setMobileCredentials({...mobileCredentials, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  {!otpSent ? (
                    <Button 
                      type="button"
                      onClick={handleSendOTP}
                      className="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Send OTP
                    </Button>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="otp">6-Digit OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter OTP (use 123456)"
                          maxLength={6}
                          value={mobileCredentials.otp}
                          onChange={(e) => setMobileCredentials({...mobileCredentials, otp: e.target.value})}
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
                          disabled={isLoading}
                        >
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                          Verify OTP
                        </Button>
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => setOtpSent(false)}
                        >
                          Back
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Users */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg">Demo Users</CardTitle>
            <CardDescription>Use these credentials for testing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoUsers.map((user, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{user.name}</h4>
                  <Badge className={user.color}>{user.type}</Badge>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>📧 {user.email}</div>
                  <div>📱 {user.phone}</div>
                  <div className="text-orange-600">💡 Password: any text (for email) | OTP: 123456 (for mobile)</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
