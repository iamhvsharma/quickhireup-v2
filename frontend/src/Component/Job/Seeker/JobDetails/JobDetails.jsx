import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/jobs/${jobId}`);
        if (response.data.success) {
          setJob(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Failed to load job details');
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApply = async () => {
    try {
      // In a real app, get this from your auth context
      const userId = 'your-user-id';
      
      const response = await axios.post(`http://localhost:8000/api/jobs/${jobId}/apply`, {
        userId,
        jobDetails: {
          title: job.title,
          company: job.companyDetails?.companyName,
          location: job.location,
          salary: job.salary,
          positionType: job.positionType,
          remotePolicy: job.remotePolicy
        }
      });

      if (response.data.success) {
        toast.success('Application submitted successfully!');
        navigate('/dashboard/applications'); // Navigate to applications page
      }
    } catch (error) {
      console.error('Error applying:', error);
      toast.error('Failed to submit application');
    }
  };

  if (!job) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{job.companyDetails?.companyName}</h2>
          <p className="text-gray-600">{job.location}</p>
          <p className="text-gray-600">
            {job.salary?.currency} {job.salary?.min} - {job.salary?.max}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700">{job.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Requirements</h3>
          <div className="space-y-2">
            <p className="text-gray-700">Position Type: {job.positionType}</p>
            <p className="text-gray-700">Work Type: {job.remotePolicy}</p>
            {job.requirements?.relocation && (
              <p className="text-gray-700">• Relocation Required</p>
            )}
            {job.requirements?.relocationAssistance && (
              <p className="text-gray-700">• Relocation Assistance Available</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleApply}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply for this position
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 