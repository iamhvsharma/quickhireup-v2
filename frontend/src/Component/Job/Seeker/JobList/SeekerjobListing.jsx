import React, { useState, useMemo, useEffect } from 'react';
import JobListCard from './JobListingCard';
import axios from 'axios';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const JobList = () => {
  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem('savedJobs');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [searchTerms, setSearchTerms] = useState({
    keyword: '',
    location: '',
    company: ''
  });
  const [filters, setFilters] = useState({
    fulltime: false,
    seniorLevel: false,
    remote: false,
    contract: false
  });
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jobs/all?status=published');
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
  }, []);

  // Update localStorage whenever savedJobs changes
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify([...savedJobs]));
  }, [savedJobs]);

  // Handle search inputs
  const handleSearchChange = (field, value) => {
    setSearchTerms(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle save/unsave jobs
  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSavedJobs = new Set(prev);
      if (newSavedJobs.has(jobId)) {
        newSavedJobs.delete(jobId);
      } else {
        newSavedJobs.add(jobId);
      }
      return newSavedJobs;
    });
  };

  // Filter jobs based on all criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search by keyword (job title, company name)
      const keywordMatch = !searchTerms.keyword || 
        job.title.toLowerCase().includes(searchTerms.keyword.toLowerCase()) ||
        job.companyDetails?.companyName?.toLowerCase().includes(searchTerms.keyword.toLowerCase());

      // Search by location
      const locationMatch = !searchTerms.location ||
        job.location.toLowerCase().includes(searchTerms.location.toLowerCase());

      // Search by company
      const companyMatch = !searchTerms.company ||
        job.companyDetails?.companyName?.toLowerCase().includes(searchTerms.company.toLowerCase());

      // Filter by employment type
      const employmentMatch = (
        (!filters.fulltime || job.positionType === 'full-time') &&
        (!filters.remote || job.remotePolicy === 'remote')
      );

      // Saved jobs filter
      const savedMatch = !showSavedOnly || savedJobs.has(job._id);

      return keywordMatch && locationMatch && companyMatch && employmentMatch && savedMatch;
    });
  }, [searchTerms, filters, savedJobs, showSavedOnly, jobs]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Additional search logic if needed
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading jobs...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="bg-gray-100 p-8 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-6">Find Your Dream Job Here</h1>
        <form onSubmit={handleSearch} className="flex gap-2 bg-white p-2 rounded-lg shadow-sm">
          <div className="flex items-center flex-1 px-4 border-r">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full outline-none"
              value={searchTerms.keyword}
              onChange={(e) => handleSearchChange('keyword', e.target.value)}
            />
          </div>
          <div className="flex items-center flex-1 px-4">
            <MapPinIcon className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Add country or city"
              className="w-full outline-none"
              value={searchTerms.location}
              onChange={(e) => handleSearchChange('location', e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Add Saved Jobs filter button */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full text-sm transition-colors
            ${!showSavedOnly 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setShowSavedOnly(false)}
        >
          All Jobs ({jobs.length})
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2
            ${showSavedOnly 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setShowSavedOnly(true)}
        >
          <span>Saved</span>
          <span className="bg-opacity-20 bg-white px-2 py-0.5 rounded-full text-xs">
            {savedJobs.size}
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Company, skill, tag..."
                className="w-full p-3 border rounded-lg"
                value={searchTerms.company}
                onChange={(e) => handleSearchChange('company', e.target.value)}
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Employment</h3>
                <div className="space-y-2">
                  {Object.entries(filters).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => setFilters(prev => ({...prev, [key]: !prev[key]}))}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="flex-1">
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobListCard
                  key={job._id}
                  id={job._id}
                  title={job.title}
                  companyName={job.companyDetails?.companyName || 'Company Name'}
                  location={job.location}
                  description={job.description}
                  positionType={job.positionType}
                  salary={`${job.salary?.currency} ${job.salary?.min} - ${job.salary?.max}`}
                  remotePolicy={job.remotePolicy}
                  isSaved={savedJobs.has(job._id)}
                  onSave={() => handleSaveJob(job._id)}
                />
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  {showSavedOnly 
                    ? "You haven't saved any jobs yet"
                    : "No jobs found matching your criteria"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;