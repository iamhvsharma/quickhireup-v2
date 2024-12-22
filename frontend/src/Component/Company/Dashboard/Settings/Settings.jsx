import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="ml-64 p-6">
      <h2 className="text-2xl font-bold mb-6">Company Settings</h2>

      <div className="space-y-6 max-w-4xl">
        {/* Company Profile Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Company Profile</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue="Your Company Name" />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" defaultValue="https://yourcompany.com" />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" defaultValue="Technology" />
            </div>
          </div>
          <Button className="mt-4">Save Changes</Button>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive notifications about applications</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Application Updates</p>
                <p className="text-sm text-gray-500">Get updates when candidates modify applications</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@yourcompany.com" />
            </div>
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
          </div>
          <Button className="mt-4">Update Password</Button>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-200">
          <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
          <p className="text-sm text-gray-500 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings; 