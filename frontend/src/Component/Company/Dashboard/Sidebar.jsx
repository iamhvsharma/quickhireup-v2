import React from 'react';
import { NavLink } from 'react-router-dom';

import { 
  Briefcase, 
  Users, 
  FileText, 
  Settings, 
  Database,
  GraduationCap
} from 'lucide-react'; // Make sure to install lucide-react

const CompanySidebar = () => {
  const menuItems = [
    {
      path: '/company-dashboard/jobs',
      name: 'Jobs',
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      path: '/company-dashboard/internships',
      name: 'Internships',
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      path: '/company-dashboard/job-drafts',
      name: 'Job Drafts',
      icon: <FileText className="w-5 h-5" />
    },
    {
      path: '/company-dashboard/applications',
      name: 'Applications',
      icon: <Database className="w-5 h-5" />
    },
    {
      path: '/company-dashboard/talent-pool',
      name: 'Talent Pool',
      icon: <Users className="w-5 h-5" />
    },
    {
      path: '/company-dashboard/settings',
      name: 'Settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="flex flex-col h-full">
        {/* Company Logo/Name */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Company Dashboard</h2>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
              <h3 className="font-medium text-gray-800">Company Name</h3>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySidebar;