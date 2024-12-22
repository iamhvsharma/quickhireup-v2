import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

const JobListCard = ({
  id,
  title,
  companyName,
  location,
  description,
  positionType,
  salary,
  remotePolicy,
  isSaved,
  onSave
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/jobs/${id}`);
  };

  const handleSave = (e) => {
    e.stopPropagation(); // Prevent card click when saving
    onSave(id);
  };

  return (
    <div 
      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600">{companyName}</p>
          
          <div className="mt-2 space-y-2">
            <p className="text-gray-700">{description}</p>
            
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {positionType}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {remotePolicy}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{location}</span>
              <span>•</span>
              <span>{salary}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`p-2 hover:bg-gray-100 rounded-full ${
            isSaved ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          {isSaved ? (
            <BookmarkSolidIcon className="w-6 h-6" />
          ) : (
            <BookmarkOutlineIcon className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default JobListCard;