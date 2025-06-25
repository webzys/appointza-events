
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { authService, LoginCredentials, OTPVerification } from '@/services/authService';
import { Mail, Phone, LogIn } from "lucide-react";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [loginType, setLoginType] = useState<'email' | 'mobile'>('email');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const credentials: LoginCredentials = {
        emailOrMobile,
        loginType
      };

      const result = await authService.login(credentials);
      
      if (result.requiresOTP) {
        setShowOTP(true);
        setOtpMessage(result.message);
        toast({
          title: "OTP Sent",
          description: result.message,
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        onLoginSuccess();
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async () => {
    setIsLoading(true);

    try {
      const verification: OTPVerification = {
        emailOrMobile,
        otp
      };

      const result = await authService.verifyOTP(verification);
      
      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        onLoginSuccess();
      } else {
        toast({
          title: "Verification Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "An error occurred during verification",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDemoUsers = () => [
    { email: "john@example.com", phone: "+91 9876543210", type: "Basic User (No Aadhaar)" },
    { email: "priya.verified@example.com", phone: "+91 9876543211", type: "Aadhaar Verified User" },
    { email: "rajesh.premium@example.com", phone: "+91 9876543212", type: "Premium Subscriber" }
  ];

  if (showOTP) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Enter OTP
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">{otpMessage}</p>
          
          <div className="space-y-2">
            <Label>Enter 6-digit OTP</Label>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowOTP(false)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleOTPVerification}
              disabled={isLoading || otp.length !== 6}
              className="flex-1"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogIn className="w-5 h-5" />
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-3">
            <Label>Login Method</Label>
            <RadioGroup
              value={loginType}
              onValueChange={(value) => setLoginType(value as 'email' | 'mobile')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile" className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Mobile
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="credential">
              {loginType === 'email' ? 'Email Address' : 'Mobile Number'}
            </Label>
            <Input
              id="credential"
              type={loginType === 'email' ? 'email' : 'tel'}
              placeholder={loginType === 'email' ? 'Enter your email' : 'Enter your mobile number'}
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Demo Users:</h4>
          <div className="space-y-1 text-xs text-blue-700">
            {getDemoUsers().map((user, index) => (
              <div key={index}>
                <strong>{user.type}:</strong><br />
                Email: {user.email}<br />
                Mobile: {user.phone}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
