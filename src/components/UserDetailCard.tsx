
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Shield, CheckCircle, XCircle, Calendar, TrendingUp, Award, MessageSquare } from "lucide-react";
import { User, UserFeedback } from "@/types/models";
import { dataService } from "@/services/dataService";

interface UserDetailCardProps {
  user: User;
  onApprove?: () => void;
  onReject?: () => void;
  showActions?: boolean;
  applicationId?: number;
  clientName?: string;
}

const UserDetailCard: React.FC<UserDetailCardProps> = ({ 
  user, 
  onApprove, 
  onReject, 
  showActions = true,
  applicationId,
  clientName 
}) => {
  const userFeedback = dataService.getUserFeedback(user.id);
  const overallRating = dataService.calculateOverallRating(user.id);

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {user.name}
                {user.isAadhaarVerified && (
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {renderStars(overallRating)}
                  <span className="text-sm font-medium ml-1">{overallRating}</span>
                </div>
                <span className="text-sm text-gray-500">({user.totalRatings} reviews)</span>
              </div>
            </div>
          </div>
          <Badge className={`${user.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {user.subscriptionTier}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Performance Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{user.eventsAttended}</div>
            <div className="text-sm text-gray-600">Events Attended</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getStatusColor(user.performanceStats.onTimePercentage)}`}>
              {user.performanceStats.onTimePercentage}%
            </div>
            <div className="text-sm text-gray-600">On Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{user.applicationsAccepted}</div>
            <div className="text-sm text-gray-600">Accepted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{user.applicationsRejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>

        {/* Detailed Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Quality Rating:</span>
              <div className="flex items-center gap-1">
                {renderStars(user.performanceStats.qualityRating)}
                <span className="text-sm ml-1">{user.performanceStats.qualityRating}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Professionalism:</span>
              <div className="flex items-center gap-1">
                {renderStars(user.performanceStats.professionalismRating)}
                <span className="text-sm ml-1">{user.performanceStats.professionalismRating}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Recommendation Rate:</span>
              <span className={`text-sm font-medium ${getStatusColor(user.performanceStats.recommendationRate)}`}>
                {user.performanceStats.recommendationRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Cancellation Rate:</span>
              <span className="text-sm font-medium text-red-600">
                {user.eventsCancelled > 0 ? Math.round((user.eventsCancelled / user.totalApplications) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Recent Feedback */}
        {userFeedback.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Recent Feedback</h4>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    View All ({userFeedback.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Feedback History - {user.name}</DialogTitle>
                    <DialogDescription>
                      Complete feedback and rating history from clients
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {userFeedback.map((feedback) => (
                      <div key={feedback.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {renderStars(feedback.rating)}
                              <span className="font-medium ml-1">{feedback.rating}/5</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(feedback.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {feedback.isOnTime && (
                              <Badge className="bg-green-100 text-green-800 text-xs">On Time</Badge>
                            )}
                            {feedback.isServiceGood && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">Good Service</Badge>
                            )}
                            {feedback.isProfessional && (
                              <Badge className="bg-purple-100 text-purple-800 text-xs">Professional</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{feedback.comment}</p>
                        <p className="text-xs text-gray-500">
                          Service: {feedback.serviceTitle || feedback.eventTitle}
                        </p>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-2">
              {userFeedback.slice(0, 2).map((feedback) => (
                <div key={feedback.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-1">
                      {renderStars(feedback.rating)}
                      <span className="text-sm font-medium ml-1">{feedback.rating}/5</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && onApprove && onReject && (
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={onApprove}
              className="flex-1 bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </Button>
            <Button
              onClick={onReject}
              variant="outline"
              className="flex-1 text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDetailCard;
