
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, CheckCircle, AlertCircle, Upload, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AadhaarVerificationProps {
  onVerificationComplete?: (verified: boolean) => void;
}

const AadhaarVerification: React.FC<AadhaarVerificationProps> = ({ onVerificationComplete }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed' | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Dummy Signzy API configuration
  const SIGNZY_API_KEY = "dummy_signzy_api_key_12345";
  const SIGNZY_ENDPOINT = "https://preproduction.signzy.app/api/v2/patrons/";

  const validateAadhaarNumber = (number: string) => {
    // Basic Aadhaar validation (12 digits)
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(number);
  };

  const verifyAadhaar = async () => {
    if (!validateAadhaarNumber(aadhaarNumber)) {
      toast({
        title: "Invalid Aadhaar Number",
        description: "Please enter a valid 12-digit Aadhaar number",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    console.log("Starting Aadhaar verification with Signzy...");
    console.log("API Key:", SIGNZY_API_KEY);
    console.log("Aadhaar Number:", aadhaarNumber);

    try {
      // Simulating Signzy API call
      const requestPayload = {
        aadhaarNumber: aadhaarNumber,
        consent: true,
        timestamp: new Date().toISOString()
      };

      console.log("Request Payload:", requestPayload);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock response based on Aadhaar number pattern
      const isValid = aadhaarNumber.startsWith('2') || aadhaarNumber.startsWith('3');
      
      if (isValid) {
        setVerificationStatus('verified');
        toast({
          title: "Verification Successful",
          description: "Your Aadhaar has been successfully verified!",
        });
        onVerificationComplete?.(true);
      } else {
        setVerificationStatus('failed');
        toast({
          title: "Verification Failed",
          description: "Unable to verify the provided Aadhaar number",
          variant: "destructive",
        });
        onVerificationComplete?.(false);
      }

    } catch (error) {
      console.error("Aadhaar verification error:", error);
      setVerificationStatus('failed');
      toast({
        title: "Verification Error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">Not Verified</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Verify Aadhaar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Aadhaar Verification
          </DialogTitle>
          <DialogDescription>
            Verify your identity using Aadhaar through Signzy's secure platform
          </DialogDescription>
        </DialogHeader>
        
        <Card className="border-0 shadow-none">
          <CardContent className="space-y-4 p-0">
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input
                id="aadhaar"
                type="text"
                placeholder="Enter 12-digit Aadhaar number"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                maxLength={12}
                className="font-mono"
              />
              <p className="text-xs text-gray-500">
                Your Aadhaar details are processed securely via Signzy
              </p>
            </div>

            {verificationStatus && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Verification Status:</span>
                {getStatusBadge()}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Demo Mode</p>
                  <p className="text-blue-700">
                    Using dummy Signzy API key. In production, replace with your actual API credentials.
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Test: Use numbers starting with 2 or 3 for successful verification
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={verifyAadhaar} 
                disabled={isVerifying || !aadhaarNumber}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isVerifying ? "Verifying..." : "Verify Aadhaar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AadhaarVerification;
