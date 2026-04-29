import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Users, UserCheck, Calendar, Activity, Eye, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
interface AuthUser {
  id: string;
  email: string;
  email_confirmed_at?: string;
  last_sign_in_at?: string;
  created_at: string;
  updated_at?: string;
  raw_user_meta_data?: any;
}
interface UserProfile {
  id: string;
  email: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  company: string | null;
  bio: string | null;
  website: string | null;
  created_at: string;
  preferences: any;
  last_sign_in_at?: string;
  email_confirmed_at?: string;
  is_authenticated?: boolean;
  login_count?: number;
  last_activity?: string;
  auth_created_at?: string;
}
interface UserSession {
  id: string;
  user_id: string;
  session_id: string;
  ip_address: string | null;
  user_agent: string;
  device_fingerprint: string;
  is_active: boolean;
  created_at: string;
  last_activity: string;
}
interface UserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  description: string;
  ip_address: string | null;
  user_agent: string;
  created_at: string;
  metadata: any;
}
const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchUsers();

    // Set up real-time subscriptions
    const profilesChannel = supabase.channel('schema-db-changes').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'profiles'
    }, () => {
      console.log('Profiles table changed, refetching users...');
      fetchUsers();
    }).subscribe();
    const sessionsChannel = supabase.channel('user-sessions-changes').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'user_sessions'
    }, () => {
      console.log('User sessions changed, refetching users...');
      fetchUsers();
    }).subscribe();
    const activitiesChannel = supabase.channel('user-activities-changes').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'user_activity_logs'
    }, () => {
      console.log('User activities changed, refetching users...');
      fetchUsers();
    }).subscribe();
    return () => {
      supabase.removeChannel(profilesChannel);
      supabase.removeChannel(sessionsChannel);
      supabase.removeChannel(activitiesChannel);
    };
  }, []);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching all users using admin function...');

      // Get all auth users using the updated admin function
      const {
        data: authUsers,
        error: authError
      } = await supabase.rpc('get_all_auth_users');
      if (authError) {
        console.error('Error fetching auth users:', authError);
        console.error('Error details:', {
          code: authError.code,
          message: authError.message,
          details: authError.details,
          hint: authError.hint
        });
        throw authError;
      }
      console.log(`Found ${authUsers?.length || 0} auth users`);
      console.log('Auth users sample:', authUsers?.[0]);

      // Get all profiles
      const {
        data: profiles,
        error: profilesError
      } = await supabase.from('profiles').select('*').order('created_at', {
        ascending: false
      });
      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }
      console.log(`Found ${profiles?.length || 0} profiles`);

      // Get session data for each user
      const {
        data: sessions,
        error: sessionsError
      } = await supabase.from('user_sessions').select('user_id, created_at, last_activity, is_active').order('last_activity', {
        ascending: false
      });
      if (sessionsError) {
        console.error('Error fetching sessions:', sessionsError);
      }

      // Get activity data for each user
      const {
        data: activities,
        error: activitiesError
      } = await supabase.from('user_activity_logs').select('user_id, created_at, activity_type').order('created_at', {
        ascending: false
      });
      if (activitiesError) {
        console.error('Error fetching activities:', activitiesError);
      }

      // Combine auth users with profile data
      const allUsers: UserProfile[] = (authUsers || []).map((authUser: AuthUser) => {
        // Find matching profile
        const profile = (profiles || []).find(p => p.id === authUser.id);

        // Get user sessions and activities
        const userSessions = (sessions || []).filter(s => s.user_id === authUser.id);
        const userActivities = (activities || []).filter(a => a.user_id === authUser.id);
        return {
          id: authUser.id,
          email: authUser.email || profile?.email || 'No email set',
          username: profile?.username || authUser.raw_user_meta_data?.username || null,
          first_name: profile?.first_name || authUser.raw_user_meta_data?.first_name || null,
          last_name: profile?.last_name || authUser.raw_user_meta_data?.last_name || null,
          avatar_url: profile?.avatar_url || null,
          phone: profile?.phone || null,
          company: profile?.company || null,
          bio: profile?.bio || null,
          website: profile?.website || null,
          created_at: profile?.created_at || authUser.created_at,
          preferences: profile?.preferences || {},
          // Auth-specific data
          last_sign_in_at: authUser.last_sign_in_at || null,
          email_confirmed_at: authUser.email_confirmed_at || null,
          auth_created_at: authUser.created_at,
          // Calculate session statistics
          login_count: userSessions.length,
          last_activity: userSessions[0]?.last_activity || null,
          is_authenticated: userSessions.some(s => s.is_active)
        };
      });
      console.log(`Processed ${allUsers.length} users total`);
      console.log('Sample users:', allUsers.slice(0, 3));
      setUsers(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users. Please check the console for details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchUserDetails = async (userId: string) => {
    try {
      // Fetch user sessions
      const {
        data: sessions,
        error: sessionsError
      } = await supabase.from('user_sessions').select('*').eq('user_id', userId).order('last_activity', {
        ascending: false
      });
      if (sessionsError) throw sessionsError;
      const transformedSessions = (sessions || []).map(session => ({
        ...session,
        ip_address: session.ip_address ? String(session.ip_address) : null
      }));
      setUserSessions(transformedSessions);

      // Fetch user activities
      const {
        data: activities,
        error: activitiesError
      } = await supabase.from('user_activity_logs').select('*').eq('user_id', userId).order('created_at', {
        ascending: false
      });
      if (activitiesError) throw activitiesError;
      const transformedActivities = (activities || []).map(activity => ({
        ...activity,
        ip_address: activity.ip_address ? String(activity.ip_address) : null
      }));
      setUserActivities(transformedActivities);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user details",
        variant: "destructive"
      });
    }
  };
  const handleViewUser = (user: UserProfile) => {
    setSelectedUser(user);
    fetchUserDetails(user.id);
    setDialogOpen(true);
  };
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return user.email && user.email.toLowerCase().includes(searchLower) || user.username && user.username.toLowerCase().includes(searchLower) || user.first_name && user.first_name.toLowerCase().includes(searchLower) || user.last_name && user.last_name.toLowerCase().includes(searchLower);
  });
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.is_authenticated).length;
  const totalLogins = users.reduce((sum, user) => sum + (user.login_count || 0), 0);
  const recentUsers = users.filter(user => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(user.created_at) > oneWeekAgo;
  }).length;
  if (loading) {
    return <div className="flex justify-center p-8">Loading users...</div>;
  }
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage all registered users and their login history (Real-time updates enabled)</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Logins</p>
                <p className="text-2xl font-bold">{totalLogins}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">New This Week</p>
                <p className="text-2xl font-bold">{recentUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users by email, username, or name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-background">
            <div className="space-y-4 pr-2">
              {filteredUsers.map(user => <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar_url || ''} alt={user.username || user.email} />
                      <AvatarFallback>
                        {user.first_name?.[0] || user.username?.[0] || user.email?.[0]?.toUpperCase() || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold">
                          {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}`.trim() : user.first_name || user.last_name || user.username || 'No Name Set'}
                        </p>
                        {user.is_authenticated && <Badge variant="outline" className="text-green-600 border-green-600">
                            <UserCheck className="h-3 w-3 mr-1" />
                            Active
                          </Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        
                        {user.last_activity && <span>Last Active: {new Date(user.last_activity).toLocaleDateString()}</span>}
                        <span>Joined: {new Date(user.auth_created_at || user.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="sessions">Sessions ({userSessions.length})</TabsTrigger>
                <TabsTrigger value="activities">Activities ({userActivities.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedUser.avatar_url || ''} alt={selectedUser.username || selectedUser.email} />
                    <AvatarFallback className="text-xl">
                      {selectedUser.first_name?.[0] || selectedUser.username?.[0] || selectedUser.email?.[0]?.toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedUser.first_name || selectedUser.last_name ? `${selectedUser.first_name || ''} ${selectedUser.last_name || ''}`.trim() : selectedUser.username || selectedUser.email || 'Anonymous User'}
                    </h3>
                    <p className="text-muted-foreground">{selectedUser.email || 'No email'}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      {selectedUser.is_authenticated && <Badge variant="outline" className="text-green-600 border-green-600">
                          <UserCheck className="h-3 w-3 mr-1" />
                          Active
                        </Badge>}
                      <Badge variant="outline">
                        {selectedUser.login_count || 0} Logins
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Username</label>
                    <p className="text-sm text-muted-foreground">{selectedUser.username || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-sm text-muted-foreground">{selectedUser.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Company</label>
                    <p className="text-sm text-muted-foreground">{selectedUser.company || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Website</label>
                    <p className="text-sm text-muted-foreground">{selectedUser.website || 'Not set'}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Bio</label>
                    <p className="text-sm text-muted-foreground">{selectedUser.bio || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Auth Created At</label>
                    <p className="text-sm text-muted-foreground">{new Date(selectedUser.auth_created_at || selectedUser.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Sign In</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.last_sign_in_at ? new Date(selectedUser.last_sign_in_at).toLocaleString() : 'Never'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email Confirmed</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.email_confirmed_at ? new Date(selectedUser.email_confirmed_at).toLocaleString() : 'Not confirmed'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Activity</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.last_activity ? new Date(selectedUser.last_activity).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sessions" className="space-y-4">
                <div className="space-y-2">
                  {userSessions.map(session => <div key={session.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span className="font-medium">Session {session.session_id.substring(0, 8)}...</span>
                            {session.is_active && <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            IP: {session.ip_address || 'Unknown'} | Started: {new Date(session.created_at).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Last Activity: {new Date(session.last_activity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>)}
                  {userSessions.length === 0 && <p className="text-center text-muted-foreground py-8">No sessions found</p>}
                </div>
              </TabsContent>
              
              <TabsContent value="activities" className="space-y-4">
                <div className="space-y-2">
                  {userActivities.map(activity => <div key={activity.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4" />
                            <span className="font-medium">{activity.activity_type}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.created_at).toLocaleString()} | IP: {activity.ip_address || 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>)}
                  {userActivities.length === 0 && <p className="text-center text-muted-foreground py-8">No activities found</p>}
                </div>
              </TabsContent>
            </Tabs>}
        </DialogContent>
      </Dialog>
    </div>;
};
export default AdminUsers;