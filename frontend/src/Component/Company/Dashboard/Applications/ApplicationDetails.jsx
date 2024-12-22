import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiCheck, FiX } from 'react-icons/fi';
import Sidebar from '../Sidebar';
import { motion } from 'framer-motion';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState('Under Review');

  useEffect(() => {
    // Simulated API call to fetch application details
    const dummyApplication = {
      id: parseInt(id),
      candidate: 'John Doe',
      position: 'Frontend Developer',
      status: 'Under Review',
      appliedDate: '2024-02-20',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      experience: '3 years',
      skills: ['React', 'JavaScript', 'HTML', 'CSS'],
      education: 'Bachelor in Computer Science',
      resumeUrl: 'https://example.com/resume.pdf',
      coverLetter: 'I am excited to apply for this position...',
      portfolio: 'https://github.com/johndoe'
    };
    setApplication(dummyApplication);
    setStatus(dummyApplication.status);
  }, [id]);

  const handleAccept = async () => {
    try {
      // Simulated API call to accept application
      setStatus('Accepted');
      // Show success message
      alert('Application accepted successfully!');
      // Navigate back to applications list after 2 seconds
      setTimeout(() => navigate('/company/applications'), 2000);
    } catch (error) {
      alert('Error accepting application');
    }
  };

  const handleReject = async () => {
    try {
      // Simulated API call to reject application
      setStatus('Rejected');
      // Show rejection message
      alert('Application rejected');
      // Navigate back to applications list after 2 seconds
      setTimeout(() => navigate('/company/applications'), 2000);
    } catch (error) {
      alert('Error rejecting application');
    }
  };

  const handleDownloadResume = async () => {
    try {
      // In a real application, this would trigger a file download
      // For now, we'll simulate it with an alert
      alert('Downloading resume...');
      
      // Simulated download logic
      const response = await fetch(application.resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${application.candidate}_resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Error downloading resume');
    }
  };

  if (!application) return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 mb-6 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Applications
          </motion.button>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={application.avatar}
                  alt={application.candidate}
                  className="w-20 h-20 rounded-full mr-4 border-2 border-gray-200"
                />
                <div>
                  <h1 className="text-2xl font-semibold">{application.candidate}</h1>
                  <p className="text-gray-600">{application.position}</p>
                </div>
              </div>
              <StatusBadge status={status} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Email:</span> {application.email}</p>
                  <p><span className="font-medium">Phone:</span> {application.phone}</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Application Details</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Applied Date:</span> {application.appliedDate}</p>
                  <p><span className="font-medium">Experience:</span> {application.experience}</p>
                  <p><span className="font-medium">Education:</span> {application.education}</p>
                </div>
              </div>

              <div className="col-span-2">
                <h2 className="text-lg font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {application.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-2">
                <h2 className="text-lg font-semibold mb-4">Cover Letter</h2>
                <p className="text-gray-600 whitespace-pre-line">{application.coverLetter}</p>
              </div>

              <div className="col-span-2 flex gap-4 pt-6 border-t">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownloadResume}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <FiDownload className="mr-2" />
                  Download Resume
                </motion.button>

                {status === 'Under Review' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAccept}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <FiCheck className="mr-2" />
                      Accept Application
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReject}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      <FiX className="mr-2" />
                      Reject Application
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default ApplicationDetails; 