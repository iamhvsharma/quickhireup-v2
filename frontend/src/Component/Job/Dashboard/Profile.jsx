import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    role: "Full Stack Developer",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    about: "Experienced full-stack developer with 5+ years of experience in building scalable web applications. Passionate about clean code and user experience.",
    skills: [
      "React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker",
      "GraphQL", "Python", "Git", "Agile Methodologies"
    ],
    experience: [
      {
        id: 1,
        company: "Tech Corp",
        role: "Senior Developer",
        duration: "2020 - Present",
        description: "Leading frontend development team and architecting scalable solutions."
      },
      {
        id: 2,
        company: "StartUp Inc",
        role: "Full Stack Developer",
        duration: "2018 - 2020",
        description: "Developed and maintained multiple client applications."
      }
    ],
    education: [
      {
        id: 1,
        school: "University of Technology",
        degree: "BS in Computer Science",
        year: "2018",
        gpa: "3.8"
      }
    ]
  });

  const [newSkill, setNewSkill] = useState('');
  const [editedExperience, setEditedExperience] = useState(null);
  const [editedEducation, setEditedEducation] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, avatar: imageUrl }));
      toast({
        title: "Success",
        description: "Profile picture updated successfully!",
      });
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Here you would make an API call to update the profile
      // await updateProfile(profileData);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      role: '',
      duration: '',
      description: ''
    };
    setEditedExperience(newExp);
    setProfileData(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience]
    }));
  };

  const handleSaveExperience = (exp) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.map(e => 
        e.id === exp.id ? exp : e
      )
    }));
    setEditedExperience(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <img 
            src={profileData.avatar} 
            alt={profileData.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 cursor-pointer">
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </label>
        </div>
        {isEditing ? (
          <div className="mt-4">
            <input
              type="text"
              value={profileData.name}
              onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              className="text-2xl font-bold text-center text-gray-900 bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              value={profileData.role}
              onChange={e => setProfileData(prev => ({ ...prev, role: e.target.value }))}
              className="text-gray-600 text-center mt-1 bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">{profileData.name}</h1>
            <p className="text-gray-600">{profileData.role}</p>
          </>
        )}
      </div>

      {/* Edit Controls */}
      <div className="flex justify-end mb-6">
        {isEditing ? (
          <div className="space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isEditing ? (
            <>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={e => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={e => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={e => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{profileData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800">{profileData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-800">{profileData.location}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">About</h2>
        {isEditing ? (
          <textarea
            value={profileData.about}
            onChange={e => setProfileData(prev => ({ ...prev, about: e.target.value }))}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        ) : (
          <p className="text-gray-700">{profileData.about}</p>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
          {isEditing && (
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddSkill}
                className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {profileData.skills.map((skill, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium group relative"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-indigo-400 hover:text-indigo-600"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
          {isEditing && (
            <button
              onClick={handleAddExperience}
              className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Add Experience
            </button>
          )}
        </div>
        <div className="space-y-6">
          {profileData.experience.map((exp) => (
            <div key={exp.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              {editedExperience?.id === exp.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedExperience.role}
                    onChange={e => setEditedExperience(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="Role"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={editedExperience.company}
                    onChange={e => setEditedExperience(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={editedExperience.duration}
                    onChange={e => setEditedExperience(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="Duration"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    value={editedExperience.description}
                    onChange={e => setEditedExperience(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Description"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setEditedExperience(null)}
                      className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveExperience(editedExperience)}
                      className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-gray-900 font-medium">{exp.role}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{exp.duration}</span>
                      {isEditing && (
                        <button
                          onClick={() => setEditedExperience(exp)}
                          className="text-indigo-600 hover:text-indigo-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Education</h2>
        {profileData.education.map((edu) => (
          <div key={edu.id}>
            <h3 className="text-gray-900 font-medium">{edu.school}</h3>
            <p className="text-gray-600">{edu.degree}</p>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-sm text-gray-500">Graduated {edu.year}</span>
              <span className="text-sm text-gray-500">GPA: {edu.gpa}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;