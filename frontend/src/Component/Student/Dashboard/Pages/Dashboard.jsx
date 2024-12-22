import React from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Briefcase, 
  Compass,
  Bell,
  Search,
  User,
  BarChart,
  BookMarked,
  GraduationCap,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const learningProgress = [
    { 
      title: "Data Structures", 
      progress: 75,
      nextTopic: "Binary Trees",
      timeSpent: "12h 30m"
    },
    { 
      title: "System Design", 
      progress: 45,
      nextTopic: "Load Balancing",
      timeSpent: "8h 15m"
    }
  ];

  const recommendedJobs = [
    {
      role: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      match: "95%"
    },
    {
      role: "Software Engineer",
      company: "InnovateTech",
      location: "New York",
      match: "88%"
    }
  ];

  const careerGuides = [
    {
      title: "Resume Building Workshop",
      date: "Tomorrow, 2:00 PM",
      type: "Workshop"
    },
    {
      title: "Interview Preparation Guide",
      date: "Available Now",
      type: "Resource"
    }
  ];

  const skillsToImprove = [
    {
      skill: "React.js",
      level: "Intermediate",
      recommendation: "Build 2 more projects"
    },
    {
      skill: "System Design",
      level: "Beginner",
      recommendation: "Complete fundamentals course"
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Learning Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Learning Progress
            </h2>
          </div>
          <div className="space-y-4">
            {learningProgress.map((course, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{course.title}</h3>
                  <span className="text-sm text-gray-500">{course.timeSpent}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-500 rounded-full h-2" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">Next: {course.nextTopic}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills to Improve */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Skills to Improve
            </h2>
          </div>
          <div className="space-y-4">
            {skillsToImprove.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{skill.skill}</h3>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {skill.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{skill.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other sections... */}
      </div>
    </div>
  );
};

export default Dashboard; 