import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Briefcase,
  GraduationCap,
  Users,
  BookOpen,
  Search,
  MapPin,
  Building2,
  Clock,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

// Dummy Data
const DUMMY_DATA = {
  jobs: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      type: "Full-time",
      location: "Remote",
      description:
        "Looking for an experienced frontend developer with React expertise...",
      salary: "$80k - $120k",
      postedDate: "2024-02-15",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "DataFlow Systems",
      type: "Contract",
      location: "Hybrid",
      description: "Join our backend team to build scalable microservices...",
      salary: "$90k - $140k",
      postedDate: "2024-02-14",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Innovation Labs",
      type: "Full-time",
      location: "On-site",
      description: "Seeking a full stack developer for our growing team...",
      salary: "$70k - $110k",
      postedDate: "2024-02-13",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "Cloud Systems Inc.",
      type: "Full-time",
      location: "Remote",
      description: "Seeking an experienced DevOps engineer to manage our cloud infrastructure...",
      salary: "$95k - $135k",
      postedDate: "2024-02-12",
    },
    {
      id: 5,
      title: "Mobile App Developer",
      company: "AppTech Solutions",
      type: "Part-time",
      location: "Hybrid",
      description: "Looking for a skilled mobile developer with iOS and Android experience...",
      salary: "$60k - $90k",
      postedDate: "2024-02-11",
    },
    {
      id: 6,
      title: "UI/UX Designer",
      company: "Creative Digital",
      type: "Contract",
      location: "On-site",
      description: "Join our design team to create beautiful and intuitive interfaces...",
      salary: "$75k - $95k",
      postedDate: "2024-02-10",
    }
  ],
  internships: [
    {
      id: 1,
      title: "Summer Software Internship",
      company: "Tech Innovators",
      duration: "3 months",
      stipend: "Paid",
      location: "Remote",
      description: "Learn and work with cutting-edge technologies...",
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "AI Solutions",
      duration: "6 months",
      stipend: "Paid",
      location: "Hybrid",
      description: "Work on real-world machine learning projects...",
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      company: "Creative Studios",
      duration: "4 months",
      stipend: "Paid",
      location: "Remote",
      description: "Design user interfaces for modern web applications...",
    },
    {
      id: 4,
      title: "Marketing Intern",
      company: "Digital Marketing Pro",
      duration: "4 months",
      stipend: "Paid",
      location: "Hybrid",
      description: "Learn digital marketing strategies and implementation...",
    },
    {
      id: 5,
      title: "Cloud Engineering Intern",
      company: "CloudTech Solutions",
      duration: "6 months",
      stipend: "Paid",
      location: "Remote",
      description: "Work with latest cloud technologies and DevOps tools...",
    },
    {
      id: 6,
      title: "Product Management Intern",
      company: "Product Labs",
      duration: "3 months",
      stipend: "Unpaid",
      location: "On-site",
      description: "Learn product development lifecycle and management...",
    }
  ],
  mentors: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Senior Tech Lead",
      experience: 12,
      expertise: ["React", "System Design", "Team Leadership"],
      availability: "10 hrs/week",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Principal Engineer",
      experience: 15,
      expertise: ["Cloud Architecture", "DevOps", "Scalability"],
      availability: "5 hrs/week",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "Product Manager",
      experience: 8,
      expertise: ["Product Strategy", "Agile", "UX"],
      availability: "8 hrs/week",
      rating: 4.7,
    },
    {
      id: 4,
      name: "David Wilson",
      role: "DevOps Architect",
      experience: 10,
      expertise: ["AWS", "Kubernetes", "CI/CD"],
      availability: "15 hrs/week",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "UI/UX Director",
      experience: 9,
      expertise: ["Design Systems", "User Research", "Figma"],
      availability: "6 hrs/week",
      rating: 4.9,
    },
    {
      id: 6,
      name: "Robert Zhang",
      role: "Mobile Dev Lead",
      experience: 11,
      expertise: ["iOS", "Android", "React Native"],
      availability: "12 hrs/week",
      rating: 4.8,
    }
  ],
  resources: [
    {
      id: 1,
      title: "Web Development Fundamentals",
      category: "Development",
      duration: "20 hours",
      level: "Beginner",
      topics: ["HTML", "CSS", "JavaScript"],
      rating: 4.5,
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      category: "Frontend",
      duration: "15 hours",
      level: "Advanced",
      topics: ["React", "Redux", "Performance"],
      rating: 4.8,
    },
    {
      id: 3,
      title: "System Design Basics",
      category: "Architecture",
      duration: "25 hours",
      level: "Intermediate",
      topics: ["Scalability", "Database Design", "APIs"],
      rating: 4.6,
    },
    {
      id: 4,
      title: "Mobile App Development",
      category: "Mobile",
      duration: "30 hours",
      level: "Intermediate",
      topics: ["React Native", "iOS", "Android"],
      rating: 4.7,
    },
    {
      id: 5,
      title: "Cloud Computing Essentials",
      category: "Cloud",
      duration: "25 hours",
      level: "Beginner",
      topics: ["AWS", "Azure", "GCP"],
      rating: 4.4,
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      category: "Design",
      duration: "18 hours",
      level: "Intermediate",
      topics: ["User Research", "Wireframing", "Prototyping"],
      rating: 4.9,
    }
  ],
  stats: [
    { label: "Total Jobs", value: "3,247", icon: Briefcase },
    { label: "Active Internships", value: "186", icon: GraduationCap },
    { label: "Available Mentors", value: "124", icon: Users },
    { label: "Learning Resources", value: "567", icon: BookOpen },
  ],
};

// Add filter configurations
const FILTERS_CONFIG = {
  jobs: {
    jobType: {
      label: "Job Type",
      options: ["Full-time", "Part-time", "Contract", "Remote"],
    },
    experience: {
      label: "Experience Level",
      options: ["Entry Level", "Mid Level", "Senior", "Lead"],
    },
    location: {
      label: "Location",
      options: ["Remote", "On-site", "Hybrid"],
    },
  },
  internships: {
    duration: {
      label: "Duration",
      options: ["1-3 months", "3-6 months", "6+ months"],
    },
    type: {
      label: "Type",
      options: ["Paid", "Unpaid", "Credit"],
    },
    workMode: {
      label: "Work Mode",
      options: ["Remote", "On-site", "Hybrid"],
    },
  },
  mentors: {
    expertise: {
      label: "Expertise",
      options: [
        "Frontend",
        "Backend",
        "Full Stack",
        "DevOps",
        "UI/UX",
        "Mobile",
      ],
    },
    availability: {
      label: "Availability",
      options: ["5-10 hrs/week", "10-20 hrs/week", "20+ hrs/week"],
    },
    experience: {
      label: "Experience",
      options: ["5+ years", "10+ years", "15+ years"],
    },
  },
  resources: {
    level: {
      label: "Level",
      options: ["Beginner", "Intermediate", "Advanced"],
    },
    category: {
      label: "Category",
      options: ["Development", "Design", "DevOps", "Architecture"],
    },
    duration: {
      label: "Duration",
      options: ["0-10 hours", "10-20 hours", "20+ hours"],
    },
  },
};

// Add this new component for the sidebar filters
const FilterSidebar = ({ activeTab, filters, setFilters }) => {
  const filterConfig = FILTERS_CONFIG[activeTab] || {};

  const handleFilterChange = (category, option) => {
    setFilters((prev) => {
      const currentFilters = prev[activeTab] || {};
      const currentOptions = currentFilters[category] || [];

      const updatedOptions = currentOptions.includes(option)
        ? currentOptions.filter((item) => item !== option)
        : [...currentOptions, option];

      return {
        ...prev,
        [activeTab]: {
          ...currentFilters,
          [category]: updatedOptions,
        },
      };
    });
  };

  return (
    <div className="w-64 bg-card p-4 rounded-lg border">
      <h3 className="font-semibold mb-4">Filters</h3>
      {Object.entries(filterConfig).map(([category, { label, options }]) => (
        <Collapsible key={category} className="mb-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <span className="font-medium">{label}</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${category}-${option}`}
                  checked={(filters[activeTab]?.[category] || []).includes(
                    option
                  )}
                  onCheckedChange={() => handleFilterChange(category, option)}
                />
                <label
                  htmlFor={`${category}-${option}`}
                  className="text-sm text-muted-foreground"
                >
                  {option}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

// Modify your content components to use filters
const filterContent = (content, filters, tabName) => {
  if (!filters[tabName] || Object.keys(filters[tabName]).length === 0) {
    return content;
  }

  return content.filter((item) => {
    return Object.entries(filters[tabName]).every(
      ([category, selectedOptions]) => {
        if (selectedOptions.length === 0) return true;

        switch (tabName) {
          case "jobs":
            if (category === "jobType")
              return selectedOptions.includes(item.type);
            if (category === "location")
              return selectedOptions.includes(item.location);
            break;
          case "internships":
            if (category === "type")
              return selectedOptions.includes(item.stipend);
            if (category === "workMode")
              return selectedOptions.includes(item.location);
            break;
          case "mentors":
            if (category === "expertise")
              return item.expertise.some((exp) =>
                selectedOptions.includes(exp)
              );
            break;
          case "resources":
            if (category === "level")
              return selectedOptions.includes(item.level);
            if (category === "category")
              return selectedOptions.includes(item.category);
            break;
        }
        return true;
      }
    );
  });
};

const JobsContent = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {data.map((job) => (
      <Card key={job.id} className="group hover:shadow-md transition-all">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12 bg-slate-100">
              <Building2 className="h-6 w-6 text-slate-600" />
            </Avatar>
            <div>
              <h3 className="font-semibold text-slate-800">{job.title}</h3>
              <p className="text-sm text-slate-600">{job.company}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            <Badge variant="secondary" className="bg-slate-100">
              {job.location}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100">
              {job.type}
            </Badge>
          </div>
          <p className="text-sm text-slate-600 mb-4">{job.description}</p>
          <Button className="w-full">Apply Now</Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

const InternshipContent = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {data.map((internship) => (
      <Card key={internship.id} className="group hover:shadow-md transition-all">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12 bg-slate-100">
              <GraduationCap className="h-6 w-6 text-slate-600" />
            </Avatar>
            <div>
              <h3 className="font-semibold text-slate-800">{internship.title}</h3>
              <p className="text-sm text-slate-600">{internship.company}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            <Badge variant="secondary" className="bg-slate-100">{internship.stipend}</Badge>
            <Badge variant="secondary" className="bg-slate-100">{internship.duration}</Badge>
          </div>
          <p className="text-sm text-slate-600 mb-4">{internship.description}</p>
          <Button variant="outline" className="w-full">Apply Now</Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

const MentorContent = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {data.map((mentor) => (
      <Card key={mentor.id} className="group hover:shadow-md transition-all">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={`https://avatar.vercel.sh/${mentor.name}`} />
              <AvatarFallback className="bg-slate-100">
                {mentor.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-slate-800">{mentor.name}</h3>
              <p className="text-sm text-slate-600">{mentor.role}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            {mentor.expertise.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-slate-600 mb-4">
            {mentor.experience} years of experience • {mentor.availability}
          </p>
          <Button variant="outline" className="w-full">Connect</Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

const ResourcesContent = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {data.map((resource) => (
      <Card key={resource.id} className="group hover:shadow-md transition-all">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12 bg-slate-100">
              <BookOpen className="h-6 w-6 text-slate-600" />
            </Avatar>
            <div>
              <h3 className="font-semibold text-slate-800">{resource.title}</h3>
              <p className="text-sm text-slate-600">{resource.level}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            <Badge variant="secondary">{resource.category}</Badge>
            <Badge variant="outline">{resource.duration}</Badge>
          </div>
          <div className="flex gap-1 flex-wrap mb-4">
            {resource.topics.map((topic, index) => (
              <Badge key={index} variant="secondary" className="bg-slate-100">
                {topic}
              </Badge>
            ))}
          </div>
          <Button className="w-full">Access Resource</Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Update the StatsCard component with modern design
const StatsCard = ({ label, value, icon: Icon, color }) => (
  <Card className="relative overflow-hidden transition-all hover:shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardContent className="space-y-1 p-0">
        <p className="text-sm font-medium text-muted-foreground">
          {label}
        </p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <div className={`h-1 w-16 rounded-full ${color.accent} mt-2`} />
      </CardContent>
      <div className={`rounded-full p-3 ${color.light}`}>
        <Icon className={`h-5 w-5 ${color.icon}`} />
      </div>
    </CardHeader>
    {/* Add decorative element */}
    <div 
      className={`absolute bottom-0 right-0 h-24 w-24 translate-x-1/3 translate-y-1/3 transform rounded-full ${color.blur} blur-2xl`}
      aria-hidden="true"
    />
  </Card>
);

// Also add the statsData array before the GovermentDashboardLayout component
const statsData = [
  {
    label: "Total Jobs",
    value: "2,543",
    icon: Briefcase,
    color: {
      light: "bg-blue-50",
      accent: "bg-blue-500",
      icon: "text-blue-600",
      blur: "bg-blue-100/50"
    }
  },
  {
    label: "Active Internships",
    value: "123",
    icon: GraduationCap,
    color: {
      light: "bg-purple-50",
      accent: "bg-purple-500",
      icon: "text-purple-600",
      blur: "bg-purple-100/50"
    }
  },
  {
    label: "Available Mentors",
    value: "89",
    icon: Users,
    color: {
      light: "bg-emerald-50",
      accent: "bg-emerald-500",
      icon: "text-emerald-600",
      blur: "bg-emerald-100/50"
    }
  },
  {
    label: "Learning Resources",
    value: "450",
    icon: BookOpen,
    color: {
      light: "bg-amber-50",
      accent: "bg-amber-500",
      icon: "text-amber-600",
      blur: "bg-amber-100/50"
    }
  }
];

const GovermentDashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [filters, setFilters] = useState({});

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Government Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8" />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0">
                3
              </Badge>
            </Button>

            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, Admin
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your portal today.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Modified Tabs Section with Sidebar */}
        <div className="flex gap-6">
          <FilterSidebar
            activeTab={activeTab}
            filters={filters}
            setFilters={setFilters}
          />

          <div className="flex-1">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="space-y-4"
            >
              <TabsList>
                <TabsTrigger value="jobs" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Jobs
                </TabsTrigger>
                <TabsTrigger
                  value="internships"
                  className="flex items-center gap-2"
                >
                  <GraduationCap className="h-4 w-4" /> Internships
                </TabsTrigger>
                <TabsTrigger
                  value="mentors"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" /> Mentors
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" /> Resources
                </TabsTrigger>
              </TabsList>

              <TabsContent value="jobs" className="space-y-4">
                <JobsContent
                  data={filterContent(DUMMY_DATA.jobs, filters, "jobs")}
                />
              </TabsContent>

              <TabsContent value="internships" className="space-y-4">
                <InternshipContent
                  data={filterContent(
                    DUMMY_DATA.internships,
                    filters,
                    "internships"
                  )}
                />
              </TabsContent>

              <TabsContent value="mentors" className="space-y-4">
                <MentorContent
                  data={filterContent(DUMMY_DATA.mentors, filters, "mentors")}
                />
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <ResourcesContent
                  data={filterContent(
                    DUMMY_DATA.resources,
                    filters,
                    "resources"
                  )}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GovermentDashboardLayout;