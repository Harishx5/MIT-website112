import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ProfileSettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    phone: '',
    company: '',
    website: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    marketingEmails: true,
    securityAlerts: true,
    projectUpdates: true
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // Load profile data if exists
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setProfileData({
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            bio: profile.bio || '',
            phone: profile.phone || '',
            company: profile.company || '',
            website: profile.website || ''
          });

          // Set avatar URL if exists
          setAvatarUrl(profile.avatar_url || '');
          
          // Parse preferences for notifications if they exist
          if (profile.preferences) {
            const prefs = profile.preferences as any;
            setNotifications({
              emailNotifications: prefs.email_notifications ?? true,
              marketingEmails: prefs.marketing_emails ?? true,
              securityAlerts: prefs.security_alerts ?? true,
              projectUpdates: prefs.project_updates ?? true
            });
          }
        }
      } else {
        navigate('/auth');
      }
      setLoading(false);
    };

    getUser();
  }, [navigate]);

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field: string) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error", 
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    setAvatarFile(file);

    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setAvatarUrl(data.publicUrl);

      toast({
        title: "Success",
        description: "Profile picture uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          bio: profileData.bio,
          phone: profileData.phone,
          company: profileData.company,
          website: profileData.website,
          email: user.email,
          avatar_url: avatarUrl
        });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const saveNotifications = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          preferences: {
            email_notifications: notifications.emailNotifications,
            marketing_emails: notifications.marketingEmails,
            security_alerts: notifications.securityAlerts,
            project_updates: notifications.projectUpdates
          }
        });

      if (error) throw error;

      toast({
        title: "Notifications Updated",
        description: "Your notification preferences have been saved successfully.",
      });
    } catch (error: any) {
      console.error('Error saving notifications:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      
      setPasswordData({
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-3">Profile Settings</h1>
          <p className="text-muted-foreground text-lg">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="text-sm">👤 Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="text-sm">🔔 Notifications</TabsTrigger>
            <TabsTrigger value="security" className="text-sm">🔒 Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center gap-6 pb-6 border-b">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="text-xl">
                      {user?.email?.charAt(0).toUpperCase() || '👤'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload a circular profile picture (max 5MB)
                    </p>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="avatar-upload"
                      />
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor="avatar-upload" className="cursor-pointer">
                          📷 Upload Image
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted/30 border-input"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      value={profileData.phone}
                      onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                      className="bg-background border-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                      className="bg-background border-input"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    value={profileData.bio}
                    onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                    className="bg-background border-input min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="company" className="text-sm font-medium">Company</Label>
                    <Input
                      id="company"
                      placeholder="Enter company name"
                      value={profileData.company}
                      onChange={(e) => handleProfileUpdate('company', e.target.value)}
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="website" className="text-sm font-medium">🔗 Website</Label>
                    <Input
                      id="website"
                      placeholder="https://your-website.com"
                      value={profileData.website}
                      onChange={(e) => handleProfileUpdate('website', e.target.value)}
                      className="bg-background border-input"
                    />
                  </div>
                </div>

                <Button onClick={saveProfile} className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                  💾 Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg border">
                  <div>
                    <h3 className="font-medium text-lg">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>

                <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg border">
                  <div>
                    <h3 className="font-medium text-lg">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Receive promotional emails and newsletters
                    </p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={() => handleNotificationToggle('marketingEmails')}
                  />
                </div>

                <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg border">
                  <div>
                    <h3 className="font-medium text-lg">Security Alerts</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified about security-related activities
                    </p>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onCheckedChange={() => handleNotificationToggle('securityAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg border">
                  <div>
                    <h3 className="font-medium text-lg">Project Updates</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Receive updates about your projects
                    </p>
                  </div>
                  <Switch
                    checked={notifications.projectUpdates}
                    onCheckedChange={() => handleNotificationToggle('projectUpdates')}
                  />
                </div>

                <Button onClick={saveNotifications} className="w-full bg-blue-600 hover:bg-blue-700 py-3 mt-8">
                  💾 Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="bg-background border-input"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="bg-background border-input"
                    />
                  </div>

                  <Button onClick={updatePassword} className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                    🔒 Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
