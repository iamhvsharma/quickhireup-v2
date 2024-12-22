import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import StatsCard from './StatsCard';
import FeatureCard from './FeatureCard';
import ActivityFeed from './ActivityFeed';
import { Bell, Settings, Search, Calendar } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalApplicants: 0,
    shortlisted: 0,
    interviews: 0,
    profileViews: 0,
    jobViews: 0,
    matches: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/jobs/dashboard/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    }
  };

  const applicantStats = [
    { 
      label: 'Total Applicants', 
      value: stats.totalApplicants, 
      trend: calculateTrend(stats.totalApplicants), 
      color: 'text-green-500',
      link: '/company/applications?status=all'
    },
    { 
      label: 'Shortlisted', 
      value: stats.shortlisted, 
      trend: calculateTrend(stats.shortlisted), 
      color: 'text-blue-500',
      link: '/company/applications?status=shortlisted'
    },
    { 
      label: 'Interviews', 
      value: stats.interviews, 
      trend: calculateTrend(stats.interviews), 
      color: 'text-purple-500',
      link: '/company/applications?status=interview'
    },
  ];

  const sourcingStats = [
    { 
      label: 'Profile Views', 
      value: stats.profileViews, 
      trend: calculateTrend(stats.profileViews), 
      color: 'text-orange-500' 
    },
    { 
      label: 'Job Views', 
      value: stats.jobViews, 
      trend: calculateTrend(stats.jobViews), 
      color: 'text-pink-500' 
    },
    { 
      label: 'Matches', 
      value: stats.matches, 
      trend: calculateTrend(stats.matches), 
      color: 'text-indigo-500' 
    },
  ];

  const features = [
    {
      icon: "telescope",
      title: "Find top-quality talent",
      description: "Advanced filters to find the perfect candidates for your team.",
      buttonText: "Source talent",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      buttonAction: () => console.log("Source talent clicked")
    },
    {
      icon: "megaphone",
      title: "Smart Pitch Templates",
      description: "Create and manage templates to streamline your outreach process.",
      buttonText: "Create templates",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      buttonAction: () => console.log("Create templates clicked")
    },
    {
      icon: "users",
      title: "Team Collaboration",
      description: "Work together efficiently with integrated team features.",
      buttonText: "Invite team",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      buttonAction: () => console.log("Invite team members clicked")
    }
  ];

  const handleStatClick = (link) => {
    navigate(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          {/* Top Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                H
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, Harshvardhan!</h1>
                <p className="text-sm text-gray-500">Let's find your next great hire</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Bottom Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">Today's Overview</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">View metrics for:</span>
              <select className="text-sm border-none bg-gray-50 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500">
                <option>Last 14 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Applicant Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              {applicantStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => handleStatClick(stat.link)}
                >
                  <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <span className={`text-xs ${stat.color}`}>{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sourcing Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              {sourcingStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <span className={`text-xs ${stat.color}`}>{stat.trend}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Activity Feed */}
        <ActivityFeed />
      </main>
    </div>
  );
};

export default Dashboard; 