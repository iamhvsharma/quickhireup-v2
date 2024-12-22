import React, { useState } from 'react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const Overview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    title: "Software Developer",
    bio: "Passionate software developer with experience in full-stack development",
    email: "john.doe@example.com",
    jobPreferences: {
      jobType: "full-time",
      location: "New York",
      salary: 90000,
      remote: true
    },
    culturalPreferences: {
      workStyle: "collaborative",
      teamSize: "medium",
      companySize: "50-200 employees",
      industry: "Technology"
    },
    resume: {
      fileName: "john_doe_resume.pdf",
      url: "#"
    }
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // API call would go here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Edit Controls */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-gray-600">{profile.title}</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FaEdit />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
            >
              <FaCheck />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
            >
              <FaTimes />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Content */}
      <div className="space-y-8">
        {/* Basic Info Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.firstName}
                  onChange={(e) => setEditedProfile({...editedProfile, firstName: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-900">{profile.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.lastName}
                  onChange={(e) => setEditedProfile({...editedProfile, lastName: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-900">{profile.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.title}
                  onChange={(e) => setEditedProfile({...editedProfile, title: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-900">{profile.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{profile.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                className="w-full p-2 border rounded-lg"
                rows={3}
              />
            ) : (
              <p className="text-gray-900">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Job Preferences Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              {isEditing ? (
                <select
                  value={editedProfile.jobPreferences.jobType}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile,
                    jobPreferences: {...editedProfile.jobPreferences, jobType: e.target.value}
                  })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
              ) : (
                <p className="text-gray-900 capitalize">{profile.jobPreferences.jobType}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.jobPreferences.location}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile,
                    jobPreferences: {...editedProfile.jobPreferences, location: e.target.value}
                  })}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-900">{profile.jobPreferences.location}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary</label>
              {isEditing ? (
                <input
                  type="number"
                  value={editedProfile.jobPreferences.salary}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile,
                    jobPreferences: {...editedProfile.jobPreferences, salary: Number(e.target.value)}
                  })}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-900">${profile.jobPreferences.salary.toLocaleString()}/year</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remote Work</label>
              {isEditing ? (
                <select
                  value={editedProfile.jobPreferences.remote.toString()}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile,
                    jobPreferences: {...editedProfile.jobPreferences, remote: e.target.value === 'true'}
                  })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <p className="text-gray-900">{profile.jobPreferences.remote ? 'Yes' : 'No'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Cultural Preferences Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cultural Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Style</label>
              {isEditing ? (
                <select
                  value={editedProfile.culturalPreferences.workStyle}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile,
                    culturalPreferences: {...editedProfile.culturalPreferences, workStyle: e.target.value}
                  })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="collaborative">Collaborative</option>
                  <option value="independent">Independent</option>
                  <option value="mixed">Mixed</option>
                </select>
              ) : (
                <p className="text-gray-900 capitalize">{profile.culturalPreferences.workStyle}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
              {isEditing ? (
                <select
                  value={editedProfile.culturalPreferences.teamSize}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile,
                    culturalPreferences: {...editedProfile.culturalPreferences, teamSize: e.target.value}
                  })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              ) : (
                <p className="text-gray-900 capitalize">{profile.culturalPreferences.teamSize}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.culturalPreferences.companySize}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile,
                    culturalPreferences: {...editedProfile.culturalPreferences, companySize: e.target.value}
                  })}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-900">{profile.culturalPreferences.companySize}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.culturalPreferences.industry}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile,
                    culturalPreferences: {...editedProfile.culturalPreferences, industry: e.target.value}
                  })}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-900">{profile.culturalPreferences.industry}</p>
              )}
            </div>
          </div>
        </div>

        {/* Resume Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{profile.resume.fileName}</span>
            <a 
              href={profile.resume.url}
              className="text-blue-600 hover:text-blue-700 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;