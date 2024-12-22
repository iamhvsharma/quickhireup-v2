import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Users, FileText } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/student-dashboard/learning",
      name: "Learning",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      path: "/student-dashboard/internships",
      name: "Internships",
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      path: "/student-dashboard/industrial-training",
      name: "Industrial Training",
      icon: <Building2 className="w-5 h-5" />
    },
    {
      path: "/student-dashboard/mentoring",
      name: "Mentoring",
      icon: <Users className="w-5 h-5" />
    },
    {
      path: "/student-dashboard/resources",
      name: "Resources",
      icon: <FileText className="w-5 h-5" />
    },
    {
      path: "/student-dashboard/profile",
      name: "Profile",
      icon: <User className="w-5 h-5" />
    },
    {
      path: "/student-dashboard/courses",
      name: "Courses",
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      path: "/student-dashboard/help",
      name: "Help",
      icon: <HelpCircle className="w-5 h-5" />
    }
  ];

  return (
    <div className="bg-white w-64 h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">QuickHireUp</h1>

      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link
              to={item.path}
              className={`flex items-center p-2 rounded-md ${
                location.pathname === item.path
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;