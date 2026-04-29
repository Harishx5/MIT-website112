
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bold, Italic, List, Quote, Link2, Underline, Type, Eye } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import BlogImageUpload from './BlogImageUpload';

const AdminBlogPosts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const createContentRef = useRef<HTMLTextAreaElement>(null);
  const editContentRef = useRef<HTMLTextAreaElement>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    author: 'Admin',
    reading_time: 5,
    tags: '',
    image: ''
  });

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      const { error } = await supabase
        .from('blogs')
        .insert([{
          ...postData,
          tags: postData.tags ? postData.tags.split(',').map((tag: string) => tag.trim()) : [],
          is_published: true
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setIsCreateModalOpen(false);
      setNewPost({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        author: 'Admin',
        reading_time: 5,
        tags: '',
        image: ''
      });
      toast({
        title: "Success",
        description: "Blog post created successfully and published to home page.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      console.log('Updating blog post:', { id, updates });
      const { data, error } = await supabase
        .from('blogs')
        .update({
          ...updates,
          tags: updates.tags ? updates.tags.split(',').map((tag: string) => tag.trim()) : [],
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Update error:', error);
        throw error;
      }
      
      console.log('Update successful:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Update mutation succeeded:', data);
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setEditingPost(null);
      toast({
        title: "Success",
        description: "Blog post updated successfully.",
      });
    },
    onError: (error: any) => {
      console.error('Update mutation failed:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update blog post",
        variant: "destructive",
      });
    }
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
      const { error } = await supabase
        .from('blogs')
        .update({ is_published: !isPublished })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Success",
        description: "Blog post updated successfully.",
      });
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
      });
    }
  });

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }
    createPostMutation.mutate(newPost);
  };

  const handleEditPost = (post: any) => {
    setEditingPost({
      ...post,
      tags: post.tags ? post.tags.join(', ') : ''
    });
  };

  const handleUpdatePost = () => {
    if (!editingPost.title || !editingPost.content) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }
    updatePostMutation.mutate({ 
      id: editingPost.id, 
      updates: {
        title: editingPost.title,
        content: editingPost.content,
        excerpt: editingPost.excerpt,
        category: editingPost.category,
        author: editingPost.author,
        reading_time: editingPost.reading_time,
        tags: editingPost.tags,
        image: editingPost.image
      }
    });
  };

  const insertFormatting = (type: string, isEditing = false) => {
    const textareaRef = isEditing ? editContentRef : createContentRef;
    const textareaElement = textareaRef.current;
    if (!textareaElement) return;

    const start = textareaElement.selectionStart;
    const end = textareaElement.selectionEnd;
    const currentContent = isEditing ? editingPost.content : newPost.content;
    const selectedText = currentContent.substring(start, end);
    let newText = '';

    switch (type) {
      case 'bold':
        newText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'italic text'}*`;
        break;
      case 'underline':
        newText = `<u>${selectedText || 'underlined text'}</u>`;
        break;
      case 'heading1':
        newText = `\n# ${selectedText || 'Main Heading'}\n`;
        break;
      case 'heading2':
        newText = `\n## ${selectedText || 'Section Heading'}\n`;
        break;
      case 'heading3':
        newText = `\n### ${selectedText || 'Subsection Heading'}\n`;
        break;
      case 'paragraph':
        newText = `\n\n${selectedText || 'New paragraph text here...'}\n\n`;
        break;
      case 'list':
        newText = `\n• ${selectedText || 'List item'}\n• Item 2\n• Item 3\n`;
        break;
      case 'numbered-list':
        newText = `\n1. ${selectedText || 'First item'}\n2. Second item\n3. Third item\n`;
        break;
      case 'quote':
        newText = `\n> ${selectedText || 'Quote text'}\n`;
        break;
      case 'link':
        newText = `[${selectedText || 'link text'}](https://example.com)`;
        break;
      case 'line-break':
        newText = '\n---\n';
        break;
      default:
        return;
    }

    const newContent = currentContent.substring(0, start) + newText + currentContent.substring(end);
    
    if (isEditing) {
      setEditingPost(prev => ({ ...prev, content: newContent }));
    } else {
      setNewPost(prev => ({ ...prev, content: newContent }));
    }
    
    // Focus and set cursor position
    setTimeout(() => {
      textareaElement.focus();
      const newCursorPosition = start + newText.length;
      textareaElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const formatPreviewContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u class="underline">$1</u>')
      .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold mb-6 mt-8 text-gray-800">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold mb-4 mt-6 text-gray-700">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-semibold mb-3 mt-4 text-gray-600">$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-6 py-2 italic my-4 bg-blue-50 text-gray-700">$1</blockquote>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-6 mb-1 list-decimal">$1</li>')
      .replace(/^• (.*$)/gm, '<li class="ml-6 mb-1 list-disc">$1</li>')
      .replace(/^---$/gm, '<hr class="border-t-2 border-gray-300 my-6" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank">$1</a>')
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<h1>') || paragraph.includes('<h2>') || paragraph.includes('<h3>') || 
            paragraph.includes('<blockquote>') || paragraph.includes('<li>') || paragraph.includes('<hr')) {
          return paragraph;
        }
        return paragraph.trim() ? `<p class="mb-4 leading-relaxed text-gray-800">${paragraph}</p>` : '';
      })
      .join('');
  };

  const RichTextToolbar = ({ onFormat, isEditing = false }: { onFormat: (type: string) => void, isEditing?: boolean }) => (
    <div className="bg-gray-50 border-b p-3 flex flex-wrap gap-2">
      <div className="flex gap-1 border-r pr-2 mr-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('heading1')}
          title="Main Heading (H1)"
          className="text-xs px-2"
        >
          H1
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('heading2')}
          title="Section Heading (H2)"
          className="text-xs px-2"
        >
          H2
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('heading3')}
          title="Subsection Heading (H3)"
          className="text-xs px-2"
        >
          H3
        </Button>
      </div>
      
      <div className="flex gap-1 border-r pr-2 mr-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('underline')}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-1 border-r pr-2 mr-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('list')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('numbered-list')}
          title="Numbered List"
          className="text-xs px-2"
        >
          1.
        </Button>
      </div>
      
      <div className="flex gap-1 border-r pr-2 mr-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('quote')}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('link')}
          title="Link"
        >
          <Link2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('paragraph')}
          title="New Paragraph"
        >
          <Type className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onFormat('line-break')}
          title="Horizontal Line"
          className="text-xs px-2"
        >
          ---
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return <div>Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              + Create Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Create New Blog Post</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {previewMode ? 'Edit' : 'Preview'}
                </Button>
              </DialogTitle>
            </DialogHeader>
            
            <Tabs value={previewMode ? "preview" : "edit"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit" onClick={() => setPreviewMode(false)}>
                  Rich Text Editor
                </TabsTrigger>
                <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
                  Live Preview
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="edit" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter blog title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newPost.category}
                      onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="e.g., Technology"
                    />
                  </div>
                </div>
                
                <BlogImageUpload
                  currentImage={newPost.image || undefined}
                  onImageUpload={(url) => setNewPost(prev => ({ ...prev, image: url }))}
                  onImageRemove={() => setNewPost(prev => ({ ...prev, image: '' }))}
                />
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Enter blog excerpt"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="readingTime">Reading Time (minutes)</Label>
                    <Input
                      id="readingTime"
                      type="number"
                      value={newPost.reading_time}
                      onChange={(e) => setNewPost(prev => ({ ...prev, reading_time: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={newPost.tags}
                      onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="e.g., React, TypeScript, Web Development"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <RichTextToolbar onFormat={(type) => insertFormatting(type, false)} />
                    <Textarea
                      ref={createContentRef}
                      id="content"
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your blog content here..."
                      rows={15}
                      className="border-0 focus:ring-0 resize-none font-mono text-sm"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="space-y-4">
                <div className="border rounded-lg p-8 bg-white min-h-[400px] max-h-[600px] overflow-y-auto">
                  <h1 className="text-4xl font-bold mb-6 text-gray-900">{newPost.title || 'Blog Title'}</h1>
                  {newPost.excerpt && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                      <p className="text-lg text-blue-800 italic font-medium">{newPost.excerpt}</p>
                    </div>
                  )}
                  {newPost.image && (
                    <img 
                      src={newPost.image} 
                      alt="Blog preview" 
                      className="w-full max-h-80 object-cover rounded-lg mb-8 shadow-lg"
                    />
                  )}
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: formatPreviewContent(newPost.content || 'Content will appear here...') 
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <Button 
              onClick={handleCreatePost} 
              className="w-full"
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? 'Creating...' : 'Create Blog Post'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Edit Blog Post</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
            </DialogTitle>
          </DialogHeader>
          {editingPost && (
            <>
              <Tabs value={previewMode ? "preview" : "edit"} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit" onClick={() => setPreviewMode(false)}>
                    Rich Text Editor
                  </TabsTrigger>
                  <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
                    Live Preview
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Title *</Label>
                      <Input
                        id="edit-title"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter blog title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Category</Label>
                      <Input
                        id="edit-category"
                        value={editingPost.category}
                        onChange={(e) => setEditingPost(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="e.g., Technology"
                      />
                    </div>
                  </div>
                  
                  <BlogImageUpload
                    currentImage={editingPost.image || undefined}
                    onImageUpload={(url) => setEditingPost(prev => ({ ...prev, image: url }))}
                    onImageRemove={() => setEditingPost(prev => ({ ...prev, image: '' }))}
                  />
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-excerpt">Excerpt *</Label>
                    <Textarea
                      id="edit-excerpt"
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Enter blog excerpt"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-readingTime">Reading Time (minutes)</Label>
                      <Input
                        id="edit-readingTime"
                        type="number"
                        value={editingPost.reading_time}
                        onChange={(e) => setEditingPost(prev => ({ ...prev, reading_time: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                      <Input
                        id="edit-tags"
                        value={editingPost.tags}
                        onChange={(e) => setEditingPost(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="e.g., React, TypeScript, Web Development"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-content">Content *</Label>
                    <div className="border rounded-lg overflow-hidden">
                      <RichTextToolbar onFormat={(type) => insertFormatting(type, true)} isEditing={true} />
                      <Textarea
                        ref={editContentRef}
                        id="edit-content"
                        value={editingPost.content}
                        onChange={(e) => setEditingPost(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your blog content here..."
                        rows={15}
                        className="border-0 focus:ring-0 resize-none font-mono text-sm"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-4">
                  <div className="border rounded-lg p-8 bg-white min-h-[400px] max-h-[600px] overflow-y-auto">
                    <h1 className="text-4xl font-bold mb-6 text-gray-900">{editingPost.title || 'Blog Title'}</h1>
                    {editingPost.excerpt && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                        <p className="text-lg text-blue-800 italic font-medium">{editingPost.excerpt}</p>
                      </div>
                    )}
                    {editingPost.image && (
                      <img 
                        src={editingPost.image} 
                        alt="Blog preview" 
                        className="w-full max-h-80 object-cover rounded-lg mb-8 shadow-lg"
                      />
                    )}
                    <div 
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: formatPreviewContent(editingPost.content || 'Content will appear here...') 
                      }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <Button 
                onClick={handleUpdatePost} 
                className="w-full"
                disabled={updatePostMutation.isPending}
              >
                {updatePostMutation.isPending ? 'Updating...' : 'Update Blog Post'}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-background">
        <div className="space-y-4 pr-2">
          {blogPosts?.map((post) => (
            <Card key={post.id} className="bg-slate-800/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>📅 {new Date(post.created_at).toLocaleDateString()}</span>
                        <span>📂 {post.category}</span>
                        <span>👤 {post.author}</span>
                        <span>⏱️ {post.reading_time} min read</span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2 mb-2">
                          {post.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={post.is_published ? 'default' : 'secondary'}>
                      {post.is_published ? '✅ Published' : '📝 Draft'}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPost(post)}
                    >
                      ✏️ Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => togglePublishMutation.mutate({ id: post.id, isPublished: post.is_published })}
                      disabled={togglePublishMutation.isPending}
                    >
                      {post.is_published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this blog post?')) {
                          deletePostMutation.mutate(post.id);
                        }
                      }}
                      disabled={deletePostMutation.isPending}
                    >
                      🗑️
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {(!blogPosts || blogPosts.length === 0) && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No blog posts yet. Create your first blog post!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPosts;
