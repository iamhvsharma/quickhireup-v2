import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const InternshipApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setError(null);
      const response = await axios.get('http://localhost:8000/api/internships/applications');
      setApplications(response.data.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications. Please try again later.');
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/internships/applications/${applicationId}/status`, {
        status: newStatus
      });
      
      setApplications(applications.map(app => 
        app._id === applicationId ? { ...app, status: newStatus } : app
      ));
      
      toast.success(`Application ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update application status');
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      interviewing: "bg-blue-100 text-blue-800"
    };

    return (
      <Badge className={statusColors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-2xl font-bold mb-6">Internship Applications</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-semibold text-gray-600">No applications found</h3>
          <p className="text-gray-500">When students apply for internships, they'll appear here</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-semibold text-red-600">{error}</h3>
          <Button 
            onClick={fetchApplications} 
            variant="outline" 
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{application.applicant.name}</div>
                    <div className="text-sm text-gray-500">{application.applicant.email}</div>
                  </div>
                </TableCell>
                <TableCell>{application.internship.title}</TableCell>
                <TableCell>
                  {new Date(application.appliedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {getStatusBadge(application.status)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setSelectedApplication(application)}
                    >
                      View
                    </Button>
                    {application.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600"
                          onClick={() => handleStatusChange(application._id, 'accepted')}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                          onClick={() => handleStatusChange(application._id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Application Details Dialog */}
      <Dialog 
        open={!!selectedApplication} 
        onOpenChange={() => setSelectedApplication(null)}
      >
        {selectedApplication && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Applicant Information</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedApplication.applicant.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedApplication.applicant.email}</p>
                  <p><span className="font-medium">Phone:</span> {selectedApplication.applicant.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Education</h3>
                <div className="mt-2">
                  <p><span className="font-medium">Institution:</span> {selectedApplication.education.institution}</p>
                  <p><span className="font-medium">Degree:</span> {selectedApplication.education.degree}</p>
                  <p><span className="font-medium">Field of Study:</span> {selectedApplication.education.field}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedApplication.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              {selectedApplication.portfolio && (
                <div>
                  <h3 className="text-lg font-semibold">Portfolio</h3>
                  <a 
                    href={selectedApplication.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Portfolio
                  </a>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold">Resume</h3>
                <a 
                  href={selectedApplication.resume} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Download Resume
                </a>
              </div>

              <div className="flex justify-end gap-2">
                {selectedApplication.status === 'pending' && (
                  <>
                    <Button
                      onClick={() => {
                        handleStatusChange(selectedApplication._id, 'accepted');
                        setSelectedApplication(null);
                      }}
                    >
                      Accept Application
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleStatusChange(selectedApplication._id, 'rejected');
                        setSelectedApplication(null);
                      }}
                    >
                      Reject Application
                    </Button>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default InternshipApplications; 