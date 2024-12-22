import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const JobPostingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    positionType: "full-time",
    location: "",
    remotePolicy: "in-office",
    salary: {
      currency: "INR",
      min: "",
      max: ""
    },
    companyDetails: {
      companyName: "",
      companySize: "",
      industry: "",
      description: ""
    },
    requirements: {
      relocation: false,
      relocationAssistance: false,
      experience: {
        minimum: "",
        preferred: ""
      },
      education: {
        degree: "",
        field: "",
        required: true
      },
      skills: {
        required: [],
        preferred: []
      },
      portfolio: {
        required: false,
        description: ""
      },
      resume: {
        required: true,
        format: ["pdf", "doc", "docx"]
      },
      additionalDocuments: []
    },
    applicationQuestions: [
      {
        type: "text",
        question: "Why do you want to work with us?",
        required: true
      },
      {
        type: "text",
        question: "Describe your relevant experience",
        required: true
      }
    ]
  });

  const handleSubmit = async (isDraft = false) => {
    try {
      // Don't validate required fields for drafts
      if (!isDraft) {
        if (!formData.title || !formData.description || !formData.positionType || !formData.location) {
          toast.error('Please fill in all required fields');
          return;
        }
      }

      // Format the data before sending
      const jobData = {
        ...formData,
        isDraft,
        salary: {
          currency: formData.salary.currency,
          min: parseInt(formData.salary.min) || 0,
          max: parseInt(formData.salary.max) || 0
        }
      };

      console.log('Sending data:', jobData);

      const response = await axios.post('http://localhost:8000/api/jobs/create', jobData);

      if (response.data.success) {
        toast.success(isDraft ? 'Job saved as draft' : 'Job published successfully');
        navigate('/Company-Dashboard');
      }
    } catch (error) {
      console.error('Error details:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Failed to save job');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      
      <form className="space-y-6">
        {/* Basic Job Details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title*</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>

          <div>
            <Label htmlFor="description">Job Description*</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the role and responsibilities"
              rows={6}
            />
          </div>

          <div>
            <Label>Position Type*</Label>
            <RadioGroup
              value={formData.positionType}
              onValueChange={(value) => setFormData({...formData, positionType: value})}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-time" id="full-time" />
                <Label htmlFor="full-time">Full-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="part-time" id="part-time" />
                <Label htmlFor="part-time">Part-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contract" id="contract" />
                <Label htmlFor="contract">Contract</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="location">Location*</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="e.g., New York, NY"
            />
          </div>

          <div>
            <Label>Remote Policy*</Label>
            <RadioGroup
              value={formData.remotePolicy}
              onValueChange={(value) => setFormData({...formData, remotePolicy: value})}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-office" id="in-office" />
                <Label htmlFor="in-office">In-office</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid">Hybrid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remote" id="remote" />
                <Label htmlFor="remote">Remote</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Company Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Company Details</h2>
          
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyDetails.companyName}
              onChange={(e) => setFormData({
                ...formData,
                companyDetails: {
                  ...formData.companyDetails,
                  companyName: e.target.value
                }
              })}
            />
          </div>

          <div>
            <Label>Company Size</Label>
            <Select
              value={formData.companyDetails.companySize}
              onValueChange={(value) => setFormData({
                ...formData,
                companyDetails: {
                  ...formData.companyDetails,
                  companySize: value
                }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="501+">501+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Experience Requirements */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Experience Requirements</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minExperience">Minimum Experience (years)</Label>
              <Input
                id="minExperience"
                type="number"
                value={formData.requirements.experience.minimum}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: {
                    ...formData.requirements,
                    experience: {
                      ...formData.requirements.experience,
                      minimum: e.target.value
                    }
                  }
                })}
              />
            </div>
            <div>
              <Label htmlFor="prefExperience">Preferred Experience (years)</Label>
              <Input
                id="prefExperience"
                type="number"
                value={formData.requirements.experience.preferred}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: {
                    ...formData.requirements,
                    experience: {
                      ...formData.requirements.experience,
                      preferred: e.target.value
                    }
                  }
                })}
              />
            </div>
          </div>
        </div>

        {/* Education Requirements */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Education Requirements</h2>
          
          <div>
            <Label>Required Degree</Label>
            <Select
              value={formData.requirements.education.degree}
              onValueChange={(value) => setFormData({
                ...formData,
                requirements: {
                  ...formData.requirements,
                  education: {
                    ...formData.requirements.education,
                    degree: value
                  }
                }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select required degree" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="master">Master's Degree</SelectItem>
                <SelectItem value="phd">Ph.D.</SelectItem>
                <SelectItem value="none">No Degree Required</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Skills Requirements */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Required Skills</h2>
          
          <div>
            <Label htmlFor="requiredSkills">Required Skills (comma-separated)</Label>
            <Input
              id="requiredSkills"
              placeholder="e.g., JavaScript, React, Node.js"
              value={formData.requirements.skills.required.join(", ")}
              onChange={(e) => setFormData({
                ...formData,
                requirements: {
                  ...formData.requirements,
                  skills: {
                    ...formData.requirements.skills,
                    required: e.target.value.split(",").map(skill => skill.trim())
                  }
                }
              })}
            />
          </div>

          <div>
            <Label htmlFor="preferredSkills">Preferred Skills (comma-separated)</Label>
            <Input
              id="preferredSkills"
              placeholder="e.g., TypeScript, AWS, Docker"
              value={formData.requirements.skills.preferred.join(", ")}
              onChange={(e) => setFormData({
                ...formData,
                requirements: {
                  ...formData.requirements,
                  skills: {
                    ...formData.requirements.skills,
                    preferred: e.target.value.split(",").map(skill => skill.trim())
                  }
                }
              })}
            />
          </div>
        </div>

        {/* Portfolio Requirements */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Portfolio Requirements</h2>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="portfolioRequired"
              checked={formData.requirements.portfolio.required}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                requirements: {
                  ...formData.requirements,
                  portfolio: {
                    ...formData.requirements.portfolio,
                    required: checked
                  }
                }
              })}
            />
            <Label htmlFor="portfolioRequired">Portfolio Required</Label>
          </div>

          {formData.requirements.portfolio.required && (
            <div>
              <Label htmlFor="portfolioDescription">Portfolio Description</Label>
              <Textarea
                id="portfolioDescription"
                placeholder="Describe what you'd like to see in the portfolio"
                value={formData.requirements.portfolio.description}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: {
                    ...formData.requirements,
                    portfolio: {
                      ...formData.requirements.portfolio,
                      description: e.target.value
                    }
                  }
                })}
              />
            </div>
          )}
        </div>

        {/* Application Questions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Application Questions</h2>
          
          {formData.applicationQuestions.map((question, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`question-${index}`}>Question {index + 1}</Label>
              <Input
                id={`question-${index}`}
                value={question.question}
                onChange={(e) => {
                  const newQuestions = [...formData.applicationQuestions];
                  newQuestions[index].question = e.target.value;
                  setFormData({
                    ...formData,
                    applicationQuestions: newQuestions
                  });
                }}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`required-${index}`}
                  checked={question.required}
                  onCheckedChange={(checked) => {
                    const newQuestions = [...formData.applicationQuestions];
                    newQuestions[index].required = checked;
                    setFormData({
                      ...formData,
                      applicationQuestions: newQuestions
                    });
                  }}
                />
                <Label htmlFor={`required-${index}`}>Required</Label>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData({
              ...formData,
              applicationQuestions: [
                ...formData.applicationQuestions,
                { type: "text", question: "", required: false }
              ]
            })}
          >
            Add Question
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => handleSubmit(true)}
            type="button"
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSubmit(false)}
            type="button"
          >
            Publish Job
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;

