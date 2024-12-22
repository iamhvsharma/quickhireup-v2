import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  CalendarIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

const internshipData = [
  {
    id: 1,
    title: "Frontend Development Intern",
    company: "TechCorp Solutions",
    location: "Bangalore",
    duration: "6 months",
    stipend: "₹15,000/month",
    type: "Full-time",
    workMode: "Remote",
    description: "Join our dynamic team to work on cutting-edge web applications using React and modern frontend technologies.",
    requirements: [
      "Knowledge of HTML, CSS, JavaScript",
      "Familiarity with React.js",
      "Basic understanding of REST APIs",
      "Good problem-solving skills"
    ],
    responsibilities: [
      "Develop responsive web interfaces",
      "Collaborate with the design team",
      "Write clean, maintainable code",
      "Participate in code reviews"
    ],
    postedDate: "2024-03-15",
    deadline: "2024-04-15",
    openings: 3
  },
  // Add 14 more similar internship objects with different details
  {
    id: 2,
    title: "Data Science Intern",
    company: "Analytics Pro",
    location: "Mumbai",
    duration: "3 months",
    stipend: "₹20,000/month",
    type: "Part-time",
    workMode: "Hybrid",
    description: "Work on real-world data analysis projects using machine learning and statistical methods.",
    requirements: [
      "Python programming",
      "Basic knowledge of ML algorithms",
      "Statistics fundamentals",
      "Experience with pandas & numpy"
    ],
    responsibilities: [
      "Data cleaning and preprocessing",
      "Feature engineering",
      "Model development and validation",
      "Prepare analysis reports"
    ],
    postedDate: "2024-03-14",
    deadline: "2024-04-10",
    openings: 2
  },
  // ... Add more internships here
];

const Internships = () => {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (internship) => {
    setSelectedInternship(internship);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Internships</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internshipData.map((internship) => (
          <Card 
            key={internship.id} 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(internship)}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{internship.title}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <BuildingOffice2Icon className="w-4 h-4 mr-1" />
                  <span>{internship.company}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CurrencyRupeeIcon className="w-4 h-4 mr-2" />
                  <span>{internship.stipend}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {internship.workMode}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {internship.type}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedInternship && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedInternship.title}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Company and Basic Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{selectedInternship.company}</h3>
                  <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {selectedInternship.location}
                    </div>
                    <div className="flex items-center">
                      <BriefcaseIcon className="w-4 h-4 mr-1" />
                      {selectedInternship.type}
                    </div>
                  </div>
                </div>
                <Button>Apply Now</Button>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-gray-600">Duration</div>
                  <div className="font-semibold">{selectedInternship.duration}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-gray-600">Stipend</div>
                  <div className="font-semibold">{selectedInternship.stipend}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-gray-600">Openings</div>
                  <div className="font-semibold">{selectedInternship.openings}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold mb-2">About the internship</h4>
                <p className="text-gray-600">{selectedInternship.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {selectedInternship.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {selectedInternship.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              {/* Additional Info */}
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  Posted: {new Date(selectedInternship.postedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  Apply by: {new Date(selectedInternship.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Internships;