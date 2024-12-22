import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Replace with actual user ID from auth context
        const userId = 'your-user-id';
        const response = await axios.get(`http://localhost:8000/api/jobs/applications/user/${userId}`);
        
        if (response.data.success) {
          setApplications(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.error('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewing: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-48">Loading applications...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-gray-500">You haven't applied to any jobs yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application._id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold">{application.jobDetails.title}</h2>
                    <Badge className={getStatusBadgeColor(application.status)}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <BuildingOffice2Icon className="w-5 h-5" />
                    <span>{application.jobDetails.company}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPinIcon className="w-5 h-5" />
                      <span>{application.jobDetails.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <BriefcaseIcon className="w-5 h-5" />
                      <span>{application.jobDetails.positionType}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <CurrencyDollarIcon className="w-5 h-5" />
                      <span>
                        {application.jobDetails.salary.currency} {application.jobDetails.salary.min} - {application.jobDetails.salary.max}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <ClockIcon className="w-5 h-5" />
                      <span>Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;

