import React, { useState, useEffect } from 'react';
import { FiSearch, FiUpload } from 'react-icons/fi';
import { BsPeople } from 'react-icons/bs';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const JobsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const status = activeTab === 'active' ? 'published' : 'draft';
        const response = await axios.get(`http://localhost:8000/api/jobs/all?status=${status}`);
        if (response.data.success) {
          setJobs(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [activeTab]);

  const handlePostJob = () => {
    navigate('/job-posting-form');
  };

  const handleEditDraft = (draftId) => {
    navigate(`/job-posting-form/${draftId}`);
  };

  const handleDeleteDraft = async (draftId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/jobs/drafts/${draftId}`);
      if (response.data.success) {
        toast.success('Draft deleted successfully');
        // Refresh drafts list
        const updatedDrafts = jobs.filter(job => job._id !== draftId);
        setJobs(updatedDrafts);
      }
    } catch (error) {
      console.error('Error deleting draft:', error);
      toast.error('Failed to delete draft');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Jobs</h1>
            <Button 
              onClick={handlePostJob}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="w-5 h-5" />
              Post Job
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tabs */}
          <div className="flex mb-6">
            <button
              className={`px-4 py-2 ${
                activeTab === 'active'
                  ? 'bg-white border-t border-l border-r rounded-t-md'
                  : 'bg-gray-100'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Active ({jobs.filter(job => job.status === 'published').length})
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === 'drafts'
                  ? 'bg-white border-t border-l border-r rounded-t-md'
                  : 'bg-gray-100'
              }`}
              onClick={() => setActiveTab('drafts')}
            >
              Drafts ({jobs.filter(job => job.status === 'draft').length})
            </button>
          </div>

          {/* Jobs/Drafts List */}
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{job.title || 'Untitled Job'}</h3>
                      <p className="text-gray-600 mt-1">
                        {job.description?.substring(0, 150) || 'No description added yet'}...
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        {job.location && <span>{job.location}</span>}
                        {job.positionType && <span>{job.positionType}</span>}
                        <span>Last edited: {new Date(job.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {activeTab === 'drafts' && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditDraft(job._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDraft(job._id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty state
            <div className="bg-white/50 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No jobs found.</h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'drafts' 
                  ? "You don't have any saved drafts."
                  : "You haven't posted any jobs yet."}
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={handlePostJob}>
                  <FiUpload className="mr-2" /> Post a Job
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;