import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/jobs/${jobId}`);
        if (response.data.success) {
          setJob(response.data.data);
          // Check if job is saved
          const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
          setIsSaved(savedJobs.includes(jobId));
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        toast.error('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleSave = () => {
    const savedJobs = new Set(JSON.parse(localStorage.getItem('savedJobs') || '[]'));
    if (isSaved) {
      savedJobs.delete(jobId);
    } else {
      savedJobs.add(jobId);
    }
    localStorage.setItem('savedJobs', JSON.stringify([...savedJobs]));
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Job removed from saved' : 'Job saved successfully');
  };

  const handleApply = async () => {
    try {
      // Replace with actual user ID from auth context
      const userId = 'your-user-id';
      const response = await axios.post(`http://localhost:8000/api/jobs/${jobId}/apply`, {
        userId
      });

      if (response.data.success) {
        toast.success('Application submitted successfully');
        navigate('/dashboard/applications');
      }
    } catch (error) {
      console.error('Error applying to job:', error);
      toast.error('Failed to submit application');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!job) {
    return <div className="text-center py-10">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <p className="text-lg text-gray-600">{job.companyDetails?.companyName}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              {isSaved ? (
                <BookmarkSolidIcon className="w-5 h-5 text-blue-500" />
              ) : (
                <BookmarkOutlineIcon className="w-5 h-5" />
              )}
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <Button onClick={handleApply}>Apply Now</Button>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <p className="text-gray-600">Location: {job.location}</p>
            <p className="text-gray-600">Position Type: {job.positionType}</p>
            <p className="text-gray-600">Work Type: {job.remotePolicy}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              Salary: {job.salary?.currency} {job.salary?.min} - {job.salary?.max}
            </p>
            <p className="text-gray-600">
              Company Size: {job.companyDetails?.companySize}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              {job.requirements?.relocation && "• Willing to relocate"}
              {job.requirements?.relocationAssistance && " (Relocation assistance available)"}
            </p>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center">
          <Button size="lg" onClick={handleApply}>
            Apply for this position
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default JobDetailsPage; 