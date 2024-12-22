import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  UserIcon,
  BriefcaseIcon,
  BookmarkIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const JobSeekerSidebar = () => {
  const menuItems = [
    {
      path: "/jobseeker-dashboard",
      name: "Profile",
      icon: <UserIcon className="w-5 h-5" />
    },
    {
      path: "/jobseeker-dashboard/applications",
      name: "My Applications",
      icon: <BriefcaseIcon className="w-5 h-5" />
    },
    {
      path: "/jobseeker-dashboard/saved-jobs",
      name: "Saved Jobs",
      icon: <BookmarkIcon className="w-5 h-5" />
    },
    {
      path: "/jobseeker-dashboard/settings",
      name: "Settings",
      icon: <Cog6ToothIcon className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-64 bg-white border-r min-h-screen p-4">
      <div className="space-y-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default JobSeekerSidebar;

