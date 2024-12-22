import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PencilIcon,
  TrashIcon,
  ArrowUpRightIcon
} from '@heroicons/react/24/outline';

const JobDrafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/jobs/drafts');
      if (response.data.success) {
        setDrafts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching drafts:', error);
      toast.error('Failed to load drafts');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (draftId) => {
    navigate(`/job-posting-form/${draftId}`);
  };

  const handleDelete = async (draftId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/jobs/drafts/${draftId}`);
      if (response.data.success) {
        toast.success('Draft deleted successfully');
        setDrafts(drafts.filter(draft => draft._id !== draftId));
      }
    } catch (error) {
      console.error('Error deleting draft:', error);
      toast.error('Failed to delete draft');
    }
  };

  const handlePublish = async (draftId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/jobs/drafts/${draftId}/publish`);
      if (response.data.success) {
        toast.success('Job published successfully');
        setDrafts(drafts.filter(draft => draft._id !== draftId));
      }
    } catch (error) {
      console.error('Error publishing draft:', error);
      toast.error('Failed to publish draft');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 ml-64">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Draft Jobs</h1>
        <Button onClick={() => navigate('/job-posting-form')}>
          Create New Job
        </Button>
      </div>

      {drafts.length === 0 ? (
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">No drafts found</h3>
          <p className="text-gray-500 mt-2">Start creating a new job posting</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {drafts.map((draft) => (
            <Card key={draft._id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {draft.title || 'Untitled Job'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {draft.description?.substring(0, 150) || 'No description added yet'}...
                  </p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    {draft.location && <span>{draft.location}</span>}
                    {draft.positionType && <span>{draft.positionType}</span>}
                    <span>Last edited: {new Date(draft.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(draft._id)}
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePublish(draft._id)}
                  >
                    <ArrowUpRightIcon className="w-4 h-4 mr-1" />
                    Publish
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(draft._id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>

              {/* Requirements Summary */}
              {(draft.requirements?.skills?.required?.length > 0 || 
                draft.requirements?.experience?.minimum) && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-4 text-sm">
                    {draft.requirements.experience?.minimum && (
                      <span className="text-gray-600">
                        Min. Experience: {draft.requirements.experience.minimum} years
                      </span>
                    )}
                    {draft.requirements.skills?.required?.length > 0 && (
                      <span className="text-gray-600">
                        Skills: {draft.requirements.skills.required.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobDrafts; 