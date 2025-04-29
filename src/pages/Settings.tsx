
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-muted-foreground">Configure repository settings</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general settings for the repository</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autosave">Enable autosave</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save changes to documents
                    </p>
                  </div>
                  <Switch id="autosave" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use dark theme for the interface
                    </p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Usage analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Collect anonymous usage data
                    </p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Configure access permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-login">Require login for all pages</Label>
                    <p className="text-sm text-muted-foreground">
                      Prevent any access without authentication
                    </p>
                  </div>
                  <Switch id="require-login" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="download-permission">Allow document downloads</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to download document files
                    </p>
                  </div>
                  <Switch id="download-permission" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-registration">Enable user registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register for an account
                    </p>
                  </div>
                  <Switch id="user-registration" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-document">New document notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when new documents are uploaded
                    </p>
                  </div>
                  <Switch id="new-document" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="update-notification">Document updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when documents are updated
                    </p>
                  </div>
                  <Switch id="update-notification" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notif">Email notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications to email
                    </p>
                  </div>
                  <Switch id="email-notif" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Settings;
