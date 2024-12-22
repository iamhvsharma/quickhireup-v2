import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resume from "./Component/Resume/resume";
import LandingPage from "./Component/LandingPage/LandingPage";
import OnBoard from "./Component/Company/Process/onBoard";
import Jobs from "./Component/Job/ApplyForm";
import CompanyProfile from "./Component/Company/Process/CreateAccount";
import Welcome from "./Component/Company/Process/WelcomePage";
import FindTalent from "./Component/Company/Telent/talent-sourcing";
import PostJob from "./Component/Company/JobPosting/job-posting-form";
import CreateProfile from "./Component/Profile/Build/Components/CreateProfile";
import Mentor from "./Component/Mentor/LandingPage";
import BecomeMentorForm from "./Component/Mentor/components/BecomeMentorForm";
import BuildProfile from "./Component/Profile/Build/BuildProfile";
import StudentProfileWizard from "./Component/Profile/Student/StudentProfileWizard";
import { StudentProfileProvider } from "@/contexts/StudentProfileContext";
import { JobPreferencesProvider } from "@/contexts/JobPreferencesContext";
import AiResume from "./Component/Resume/resume";
import AiMock from "./Component/AIMockInterview/AIMockInterview";
import JobListings from "./Component/Company/Dashboard/JobListing/JobsList";
import MentorProfileForm from "./Component/Mentor/components/MentorProfile/MentorProfile";
import CompnayDashboard from "./Component/Company/Dashboard/Profile/Dashboard";
import JobsPage from "./Component/Company/Jobs/JobsPage";
import ApplicationsPage from "./Component/Company/Dashboard/Applications/ApplicationsPage";
import MentorList from "./Component/Mentor/components/MentorProfile/MentorList";
import JobListingCard from "./Component/Job/Seeker/JobList/JobListingCard";
import SeekerJobListing from "./Component/Job/Seeker/JobList/SeekerJobListing";
import UserDashboardWizard from "./Component/Job/userDashboard/UserDashboardWizard";
import DashboardLayout from "./Component/Job/Dashboard/DashboardLayout";
import Dashboard from "./Component/Student/Dashboard/Pages/Dashboard";

import AiChatBot from './Component/AiChatBot/page'
import StudentDashboard from './Component/Student/Dashboard/DashboardLayout'
import ProfileForm from './Component/Job/Create-Profile/ProfileForm'


import JobPostingForm from './Component/Company/JobPosting/job-posting-form';

import UnifiedAuth from "./Component/Auth/UnifiedAuth";
import ApplicationDetails from "./Component/Company/Dashboard/Applications/ApplicationDetails";
import { AuthProvider } from "./Component/Auth/context/AuthContext";
import { Toaster } from "./components/ui/toaster";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobDrafts from './Component/Company/JobPosting/JobDrafts';
import JobDetailsPage from './Component/Job/Seeker/JobDetails/JobDetailsPage';
import ProfileOverview from './Component/Job/Dashboard/Tabs/ProfileOverview';
import Learning from './Component/Student/Dashboard/Pages/Learning';
import Internships from './Component/Student/Dashboard/Pages/Internships';
import Profile from './Component/Student/Dashboard/Pages/Profile';
import Courses from './Component/Student/Dashboard/Pages/Courses';
import Help from './Component/Student/Dashboard/Pages/Help';
import Government from './Component/goverment/goverment';


// In your routes:
import TalentPool from './Component/Company/Telent/talent-sourcing';

// In your routes configuration:

// Import Company Dashboard Components
import CompanyDashboardLayout from "./Component/Company/Dashboard/DashboardLayout";
import CompanyDashboard from "./Component/Company/Dashboard/Profile/Dashboard";
import CompanyJobs from "./Component/Company/Jobs/JobsPage";
import InternshipApplications from "./Component/Company/Dashboard/Applications/InternshipApplications";
import CompanyApplications from "./Component/Company/Dashboard/Applications/ApplicationsPage";
import CompanySettings from "./Component/Company/Dashboard/Settings/Settings";

// Import JobSeeker Dashboard Components
import JobSeekerDashboardLayout from "./Component/Job/Dashboard/DashboardLayout";

import SavedJobs from "./Component/Job/Dashboard/SavedJobs";
import MyApplications from "./Component/Job/Dashboard/MyApplications";
import JobSeekerSettings from "./Component/Job/Dashboard/Settings";

import IndustrialTraining from "./Component/Student/Dashboard/Pages/IndustrialTraining";
import Resources from "./Component/Student/Dashboard/Pages/Resources";


const App = () => {
  return (
    <>
      <StudentProfileProvider>
        <JobPreferencesProvider>
          <AuthProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Company Dashboard Routes */}
                <Route path="/company-dashboard/*" element={<CompanyDashboardLayout />}>
                
                  <Route path="jobs" element={<CompanyJobs />} />
                  <Route path="internships" element={<InternshipApplications />} />
                  <Route path="job-drafts" element={<JobDrafts />} />
                  <Route path="applications" element={<CompanyApplications />} />
                  <Route path="talent-pool" element={<TalentPool />} />
                  <Route path="settings" element={<CompanySettings />} />
                </Route>

                {/* JobSeeker Dashboard Routes */}
                <Route path="/jobSeeker-dashboard/*" element={<JobSeekerDashboardLayout />}>
                
                  
                  <Route path="applications" element={<MyApplications />} />
                  <Route path="saved-jobs" element={<SavedJobs />} />
                  <Route path="settings" element={<JobSeekerSettings />} />
                </Route>

                {/* Student Dashboard Routes */}
                <Route path="/student-dashboard/*" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="learning" element={<Learning />} />
                  <Route path="internships" element={<Internships />} />
                  <Route path="industrial-training" element={<IndustrialTraining />} />
                  <Route path="mentoring" element={<Mentor />} />
                  <Route path="resources" element={<Resources />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="help" element={<Help />} />
                </Route>

                {/* Other Routes */}
                <Route path="/student/onboarding" element={<StudentProfileWizard />} />
                <Route path="/jobseeker/onboarding" element={<BuildProfile />}></Route>
                <Route path="/resume" element={<Resume />} />
                {/* <Route path="/company" element={<Company />} /> */}
                <Route path="/company/onboarding" element={<OnBoard />} />
               
                <Route path="/CreateProfile" element={<CreateProfile />} />
                <Route path="/WelcomePage" element={<Welcome />} />
                <Route path="/FindTalent" element={<FindTalent />} />
                <Route path="/PostJob" element={<PostJob />} />
                <Route path="/CompanyProfile" element={<CompanyProfile />} />
                <Route path="/StudentDashboard" element={<StudentDashboard />} />
                <Route path="/job-drafts" element={<JobDrafts />} />
                <Route path="/Mentor" element={<Mentor />} />
                <Route path="/become-Mentor" element={<BecomeMentorForm />} />
                <Route path="/MentorProfile" element={<MentorProfileForm />}/>
                <Route path="/AiResume" element={<AiResume />} />
                <Route path="/JobList" element={<JobListings />} />
                <Route path="/AiMock" element={<AiMock/>} />
                <Route path="/AiChatBot" element={<AiChatBot/>} />
                <Route path="/job-posting-form" element={<JobPostingForm/>} />
                <Route path="/government" element={<Government/>} />

        


              
                <Route path="/jobs" element={<JobsPage />} />

                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/MentorList" element={<MentorList />} />
                <Route path="/mentors" element={<MentorList />} />
                <Route path="/JobListingCard" element={<JobListingCard />} />
                <Route
                  path="/SeekerJobListing"
                  element={<SeekerJobListing />}
                />
                <Route
                  path="/UserDashboardWizard"
                  element={<UserDashboardWizard />}
                />
              
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<ProfileOverview />} />
                  <Route path="profile" element={<ProfileOverview />} />
                  <Route path="applications" element={<MyApplications />} />
                  <Route path="saved-jobs" element={<SavedJobs />} />
                  
                </Route>
                <Route path="/student/dashboard" element={<DashboardLayout />}>
                  <Route index element={<StudentDashboard />} />
                   <Route path="learning" element={<Learning />} />
                  <Route path="internships" element={<Internships />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="courses" element={<Courses />} />
                
                  <Route path="help" element={<Help />} /> 
                </Route> 

                <Route path="/company/applications/:id" element={<ApplicationDetails />} />
  <Route path="/Auth">
                  <Route path="login" element={<UnifiedAuth type="login" />} />
                  <Route
                    path="register"
                    element={<UnifiedAuth type="register" />}
                  />
                </Route>
                
              </Routes>
            </Router>
          </AuthProvider>
        </JobPreferencesProvider>
      </StudentProfileProvider>
      <Toaster />
      <ToastContainer position="top-right" />
    </>
  );
};

export default App;
