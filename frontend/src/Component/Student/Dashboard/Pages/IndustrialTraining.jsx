import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Clock, MapPin, Calendar } from 'lucide-react';

const IndustrialTraining = () => {
  const trainings = [
    {
      id: 1,
      title: "Full Stack Development Training",
      company: "TechCorp Solutions",
      duration: "6 weeks",
      location: "Bangalore",
      mode: "Hybrid",
      startDate: "2024-04-15",
      skills: ["React", "Node.js", "MongoDB"],
      status: "Enrolling",
      description: "Comprehensive training in modern web development stack..."
    },
    {
      id: 2,
      title: "Cloud Computing & DevOps",
      company: "CloudTech Systems",
      duration: "8 weeks",
      location: "Remote",
      mode: "Online",
      startDate: "2024-05-01",
      skills: ["AWS", "Docker", "Kubernetes"],
      status: "Upcoming",
      description: "Learn cloud infrastructure and DevOps practices..."
    },
    // Add more training programs
  ];

  const handleApply = (trainingId) => {
    // Handle application logic
    console.log(`Applied for training ${trainingId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Industrial Training Programs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainings.map((training) => (
          <Card key={training.id} className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{training.title}</h2>
                  <Badge variant={training.status === 'Enrolling' ? 'success' : 'secondary'}>
                    {training.status}
                  </Badge>
                </div>
                <div className="flex items-center text-gray-600 mt-2">
                  <Building2 className="w-4 h-4 mr-2" />
                  {training.company}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {training.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {training.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Starts {new Date(training.startDate).toLocaleDateString()}
                </div>
              </div>

              <div>
                <p className="text-gray-600">{training.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {training.skills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>

              <Button 
                className="w-full"
                onClick={() => handleApply(training.id)}
                disabled={training.status !== 'Enrolling'}
              >
                {training.status === 'Enrolling' ? 'Apply Now' : 'Coming Soon'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IndustrialTraining; 