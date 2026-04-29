import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Code, FileText, Search, Download, ExternalLink, Zap, Shield, Settings, Lightbulb, Copy, Play, CheckCircle, ArrowRight, Globe, Smartphone, Database, Palette, BarChart, Users, Star, Clock, Terminal } from 'lucide-react';
const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('guides');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const location = useLocation();

  // Handle URL parameters to set the correct tab
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['guides', 'api', 'resources'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  const copyToClipboard = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(title);
    setTimeout(() => setCopiedCode(null), 2000);
  };
  const documentationSections = [{
    title: "API Reference",
    icon: Code,
    color: "bg-green-600",
    description: "Complete API documentation",
    items: [{
      title: "Authentication",
      description: "Learn how to authenticate API requests using JWT tokens, API keys, and OAuth2. Includes examples for secure token handling and session management.",
      time: "8 min read",
      difficulty: "Intermediate"
    }, {
      title: "REST Endpoints",
      description: "Comprehensive documentation of all REST API endpoints with request/response examples, HTTP status codes, and error handling patterns.",
      time: "20 min read",
      difficulty: "Advanced"
    }, {
      title: "GraphQL Schema",
      description: "Complete GraphQL schema definition with query examples, mutations, subscriptions, and real-time data fetching techniques.",
      time: "15 min read",
      difficulty: "Advanced"
    }, {
      title: "Rate Limiting",
      description: "Understanding API rate limits, implementing backoff strategies, and optimizing request patterns for better performance and reliability.",
      time: "5 min read",
      difficulty: "Intermediate"
    }]
  }, {
    title: "Development Guides",
    icon: FileText,
    color: "bg-purple-600",
    description: "In-depth development tutorials",
    items: [{
      title: "Web Development",
      description: "Build modern web applications using React, TypeScript, and Tailwind CSS. Covers component architecture, state management, and performance optimization.",
      time: "45 min read",
      difficulty: "Intermediate"
    }, {
      title: "Mobile Development",
      description: "Create native iOS and Android apps using React Native and Flutter. Includes device features, navigation, and cross-platform development strategies.",
      time: "60 min read",
      difficulty: "Advanced"
    }, {
      title: "Database Integration",
      description: "Set up and optimize databases with PostgreSQL, MongoDB, and Redis. Covers schema design, indexing, migrations, and performance tuning.",
      time: "25 min read",
      difficulty: "Intermediate"
    }, {
      title: "Deployment Guide",
      description: "Deploy applications to production using Docker, Kubernetes, AWS, and Vercel. Includes CI/CD pipelines, monitoring, and scaling strategies.",
      time: "35 min read",
      difficulty: "Advanced"
    }]
  }, {
    title: "Security & Best Practices",
    icon: Shield,
    color: "bg-red-600",
    description: "Security guidelines and best practices",
    items: [{
      title: "Security Guidelines",
      description: "Implement robust security measures including input validation, XSS protection, CSRF prevention, and secure coding practices for web applications.",
      time: "20 min read",
      difficulty: "Intermediate"
    }, {
      title: "SSL/TLS Setup",
      description: "Configure SSL/TLS certificates, implement HTTPS, set up security headers, and ensure secure communication between client and server.",
      time: "15 min read",
      difficulty: "Intermediate"
    }, {
      title: "Authentication Systems",
      description: "Build secure authentication systems with multi-factor authentication, password policies, session management, and social login integration.",
      time: "30 min read",
      difficulty: "Advanced"
    }, {
      title: "GDPR Compliance",
      description: "Ensure data protection compliance with GDPR requirements, cookie policies, data retention, user consent management, and privacy by design.",
      time: "25 min read",
      difficulty: "Intermediate"
    }]
  }];
  const codeExamples = [{
    title: "React Component Example",
    language: "jsx",
    description: "A modern React component with hooks",
    code: `import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (id) => {
    try {
      const response = await fetch(\`/api/users/\${id}\`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <Button onClick={() => fetchUser(userId)}>
        Refresh
      </Button>
    </div>
  );
};

export default UserProfile;`
  }, {
    title: "API Integration",
    language: "javascript",
    description: "Secure API calls with error handling",
    code: `class ApiClient {
  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${this.token}\`,
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

export default ApiClient;`
  }, {
    title: "Database Schema",
    language: "sql",
    description: "PostgreSQL table structure",
    code: `-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);`
  }, {
    title: "Mobile App Component",
    language: "typescript",
    description: "React Native component with TypeScript",
    code: `import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginForm;`
  }];
  const resources = [{
    icon: Globe,
    title: "Web Development",
    description: "Modern web applications with React, Vue, and Angular",
    topics: ["React", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"]
  }, {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications",
    topics: ["React Native", "Flutter", "iOS", "Android", "Expo"]
  }, {
    icon: Database,
    title: "Backend Development",
    description: "Server-side development and database management",
    topics: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"]
  }, {
    icon: Palette,
    title: "UI/UX Design",
    description: "User interface and experience design principles",
    topics: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Testing"]
  }, {
    icon: BarChart,
    title: "Analytics & SEO",
    description: "Digital marketing and search engine optimization",
    topics: ["Google Analytics", "SEO", "SEM", "Content Marketing", "Social Media"]
  }, {
    icon: Shield,
    title: "Security",
    description: "Application security and best practices",
    topics: ["Authentication", "Authorization", "HTTPS", "OWASP", "Penetration Testing"]
  }];
  const tutorials = [{
    title: "Building a Full-Stack E-commerce App",
    duration: "2 hours",
    level: "Advanced",
    rating: 4.8,
    thumbnail: "/placeholder.svg",
    description: "Learn to build a complete e-commerce application with payment integration"
  }, {
    title: "Mobile App Development with React Native",
    duration: "1.5 hours",
    level: "Intermediate",
    rating: 4.9,
    thumbnail: "/placeholder.svg",
    description: "Create a cross-platform mobile app from scratch"
  }, {
    title: "API Development with Node.js",
    duration: "1 hour",
    level: "Intermediate",
    rating: 4.7,
    thumbnail: "/placeholder.svg",
    description: "Build RESTful APIs with authentication and validation"
  }, {
    title: "UI/UX Design Fundamentals",
    duration: "45 min",
    level: "Beginner",
    rating: 4.6,
    thumbnail: "/placeholder.svg",
    description: "Master the basics of user interface and experience design"
  }];
  const filteredSections = documentationSections.filter(section => section.title.toLowerCase().includes(searchQuery.toLowerCase()) || section.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase())));
  return <Layout>
      <section className="py-12 bg-background pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Book className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Documentation <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-6">
              Comprehensive guides, API references, tutorials, and best practices to help you build 
              amazing applications with our solutions.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="text" placeholder="Search documentation, guides, and tutorials..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-3 text-lg" />
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="space-y-8">
              {/* Quick Access Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Quick Start</h3>
                    <p className="text-sm text-muted-foreground">Get started in 5 minutes</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">API Reference</h3>
                    <p className="text-sm text-muted-foreground">Complete API docs</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Tutorials</h3>
                    <p className="text-sm text-muted-foreground">Step-by-step guides</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Best Practices</h3>
                    <p className="text-sm text-muted-foreground">Expert recommendations</p>
                  </CardContent>
                </Card>
              </div>

              {/* Documentation Sections */}
              <div className="space-y-12">
                {filteredSections.map((section, index) => <div key={index}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center`}>
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">{section.title}</h2>
                        <p className="text-muted-foreground">{section.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.items.map((item, itemIndex) => <Card key={itemIndex} className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer group">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="group-hover:text-blue-600 transition-colors">{item.title}</CardTitle>
                              
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-3">{item.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {item.difficulty}
                              </div>
                            </div>
                          </CardContent>
                        </Card>)}
                    </div>
                  </div>)}
              </div>
            </TabsContent>

            <TabsContent value="api" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {codeExamples.map((example, index) => <Card key={index} className="bg-card/50 backdrop-blur border border-border/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{example.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(example.code, example.title)}>
                          {copiedCode === example.title ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                          {copiedCode === example.title ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400 uppercase">{example.language}</span>
                          
                        </div>
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>


            <TabsContent value="resources" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => <Card key={index} className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <resource.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-blue-600 transition-colors">{resource.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {resource.topics.map((topic, topicIndex) => <span key={topicIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {topic}
                          </span>)}
                      </div>
                      
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>
          </Tabs>

          {/* Interactive API Explorer */}
          <div className="mt-12">
            
          </div>

          {/* Support Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
              <p className="text-lg mb-6 opacity-90">
                Can't find what you're looking for? Our support team and community are here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => window.location.href = '/support-center'}
                >
                  Contact Support
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white hover:bg-white/10 text-blue-600"
                  onClick={() => window.open('https://discord.gg/marzelettech', '_blank')}
                >
                  Join Community
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white hover:bg-white/10 text-blue-600"
                  onClick={() => window.location.href = '/#contact'}
                >
                  Schedule Demo
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Documentation;