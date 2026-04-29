import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bold, Italic, List, Quote, Link2, Underline, Type, Eye, Palette } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import NewsImageUpload from './NewsImageUpload';
import { shouldShowBreakingBadge, getBreakingTimeRemaining } from '@/utils/breakingNewsUtils';

const AdminNews = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const createContentRef = useRef<HTMLTextAreaElement>(null);
  const editContentRef = useRef<HTMLTextAreaElement>(null);
  const [newNews, setNewNews] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Marzelet Team',
    image: ''
  });

  const { data: newsPosts, isLoading } = useQuery({
    queryKey: ['admin-news-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      const { error } = await supabase
        .from('news')
        .insert([{
          ...postData,
          is_published: true
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news-posts'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      setIsCreateModalOpen(false);
      setNewNews({
        title: '',
        content: '',
        excerpt: '',
        author: 'Marzelet Team',
        image: ''
      });
      toast({
        title: "Success",
        description: "News post created successfully and published.",
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
      const { error } = await supabase
        .from('news')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news-posts'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      setEditingNews(null);
      toast({
        title: "Success",
        description: "News post updated successfully.",
      });
    }
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
      const { error } = await supabase
        .from('news')
        .update({ is_published: !isPublished })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news-posts'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast({
        title: "Success",
        description: "News post updated successfully.",
      });
    }
  });

  const toggleBreakingMutation = useMutation({
    mutationFn: async ({ id, isBreaking }: { id: string; isBreaking: boolean }) => {
      const { error } = await supabase
        .from('news')
        .update({ is_breaking: !isBreaking })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news-posts'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast({
        title: "Success",
        description: "Breaking news badge updated successfully.",
      });
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news-posts'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast({
        title: "Success",
        description: "News post deleted successfully.",
      });
    }
  });

  const handleCreatePost = () => {
    if (!newNews.title || !newNews.content) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }
    createPostMutation.mutate(newNews);
  };

  const handleEditPost = (post: any) => {
    setEditingNews({
      ...post,
    });
  };

  const handleUpdatePost = () => {
    if (!editingNews.title || !editingNews.content) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }
    updatePostMutation.mutate({ 
      id: editingNews.id, 
      updates: {
        title: editingNews.title,
        content: editingNews.content,
        excerpt: editingNews.excerpt,
        author: editingNews.author,
        image: editingNews.image
      }
    });
  };

  const insertFormatting = (type: string, isEditing = false, color?: string) => {
    const textareaRef = isEditing ? editContentRef : createContentRef;
    const textareaElement = textareaRef.current;
    if (!textareaElement) return;

    const start = textareaElement.selectionStart;
    const end = textareaElement.selectionEnd;
    const currentContent = isEditing ? editingNews.content : newNews.content;
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
      case 'color':
        newText = `<span style="color: ${color || '#3b82f6'}">${selectedText || 'colored text'}</span>`;
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
      setEditingNews(prev => ({ ...prev, content: newContent }));
    } else {
      setNewNews(prev => ({ ...prev, content: newContent }));
    }
    
    // Focus and set cursor position
    setTimeout(() => {
      textareaElement.focus();
      const newCursorPosition = start + newText.length;
      textareaElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 10);
  };

  const formatPreviewContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u class="underline">$1</u>')
      .replace(/<span style="color: ([^"]+)">(.*?)<\/span>/g, '<span style="color: $1" class="font-medium">$2</span>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 mt-6 text-gray-800">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3 mt-5 text-gray-700">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-2 mt-4 text-gray-600">$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 italic my-3 bg-blue-50 text-gray-700">$1</blockquote>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
      .replace(/^• (.*$)/gm, '<li class="ml-4 mb-1 list-disc">$1</li>')
      .replace(/^---$/gm, '<hr class="border-t-2 border-gray-300 my-4" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank">$1</a>')
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<h1>') || paragraph.includes('<h2>') || paragraph.includes('<h3>') || 
            paragraph.includes('<blockquote>') || paragraph.includes('<li>') || paragraph.includes('<hr')) {
          return paragraph;
        }
        return paragraph.trim() ? `<p class="mb-3 leading-relaxed text-gray-800">${paragraph}</p>` : '';
      })
      .join('');
  };

  const ColorPicker = ({ onColorSelect, isEditing = false }: { onColorSelect: (color: string) => void, isEditing?: boolean }) => {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
    
    return (
      <div className="flex gap-1 p-2 border rounded">
        {colors.map(color => (
          <button
            key={color}
            type="button"
            className="w-6 h-6 rounded border-2 border-gray-300 hover:border-gray-500"
            style={{ backgroundColor: color }}
            onClick={() => insertFormatting('color', isEditing, color)}
            title={`Apply ${color} color`}
          />
        ))}
      </div>
    );
  };

  const RichTextToolbar = ({ onFormat, isEditing = false }: { onFormat: (type: string) => void, isEditing?: boolean }) => (
    <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
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
        <div className="relative group">
          <Button
            type="button"
            variant="outline"
            size="sm"
            title="Text Color"
          >
            <Palette className="h-4 w-4" />
          </Button>
          <div className="absolute top-full left-0 hidden group-hover:block z-10 bg-white border shadow-lg rounded mt-1">
            <ColorPicker onColorSelect={(color) => insertFormatting('color', isEditing, color)} isEditing={isEditing} />
          </div>
        </div>
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
    return <div>Loading news posts...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">News Posts</h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              + Create News Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Create New News Post</span>
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
              
              <TabsContent value="edit" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={newNews.title}
                      onChange={(e) => setNewNews(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter news title"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={newNews.author}
                      onChange={(e) => setNewNews(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="e.g., John Doe"
                    />
                  </div>
                </div>
                
                <NewsImageUpload
                  currentImage={newNews.image || undefined}
                  onImageUpload={(url) => setNewNews(prev => ({ ...prev, image: url }))}
                  onImageRemove={() => setNewNews(prev => ({ ...prev, image: '' }))}
                />
                
                <div className="space-y-1">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={newNews.excerpt}
                    onChange={(e) => setNewNews(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Enter news excerpt"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="content">Content *</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <RichTextToolbar onFormat={(type) => insertFormatting(type, false)} />
                    <Textarea
                      ref={createContentRef}
                      id="content"
                      value={newNews.content}
                      onChange={(e) => setNewNews(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your news content here..."
                      rows={12}
                      className="border-0 focus:ring-0 resize-none font-mono text-sm"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="space-y-3">
                <div className="border rounded-lg p-6 bg-white min-h-[400px] max-h-[500px] overflow-y-auto">
                  <h1 className="text-3xl font-bold mb-4 text-gray-900">{newNews.title || 'News Title'}</h1>
                  {newNews.excerpt && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                      <p className="text-base text-blue-800 italic font-medium">{newNews.excerpt}</p>
                    </div>
                  )}
                  {newNews.image && (
                    <img 
                      src={newNews.image} 
                      alt="News preview" 
                      className="w-full max-h-60 object-cover rounded-lg mb-6 shadow-lg"
                    />
                  )}
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: formatPreviewContent(newNews.content || 'Content will appear here...') 
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
              {createPostMutation.isPending ? 'Creating...' : 'Create News Post'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingNews} onOpenChange={() => setEditingNews(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Edit News Post</span>
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
          {editingNews && (
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
                
                <TabsContent value="edit" className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="edit-title">Title *</Label>
                      <Input
                        id="edit-title"
                        value={editingNews.title}
                        onChange={(e) => setEditingNews(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter news title"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="edit-author">Author</Label>
                      <Input
                        id="edit-author"
                        value={editingNews.author}
                        onChange={(e) => setEditingNews(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="e.g., John Doe"
                      />
                    </div>
                  </div>
                  
                  <NewsImageUpload
                    currentImage={editingNews.image || undefined}
                    onImageUpload={(url) => setEditingNews(prev => ({ ...prev, image: url }))}
                    onImageRemove={() => setEditingNews(prev => ({ ...prev, image: '' }))}
                  />
                  
                  <div className="space-y-1">
                    <Label htmlFor="edit-excerpt">Excerpt *</Label>
                    <Textarea
                      id="edit-excerpt"
                      value={editingNews.excerpt}
                      onChange={(e) => setEditingNews(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Enter news excerpt"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="edit-content">Content *</Label>
                    <div className="border rounded-lg overflow-hidden">
                      <RichTextToolbar onFormat={(type) => insertFormatting(type, true)} isEditing={true} />
                      <Textarea
                        ref={editContentRef}
                        id="edit-content"
                        value={editingNews.content}
                        onChange={(e) => setEditingNews(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your news content here..."
                        rows={12}
                        className="border-0 focus:ring-0 resize-none font-mono text-sm"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-3">
                  <div className="border rounded-lg p-6 bg-white min-h-[400px] max-h-[500px] overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">{editingNews.title || 'News Title'}</h1>
                    {editingNews.excerpt && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                        <p className="text-base text-blue-800 italic font-medium">{editingNews.excerpt}</p>
                      </div>
                    )}
                    {editingNews.image && (
                      <img 
                        src={editingNews.image} 
                        alt="News preview" 
                        className="w-full max-h-60 object-cover rounded-lg mb-6 shadow-lg"
                      />
                    )}
                    <div 
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: formatPreviewContent(editingNews.content || 'Content will appear here...') 
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
                {updatePostMutation.isPending ? 'Updating...' : 'Update News Post'}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-3">
        {newsPosts?.map((post) => {
          const isStillBreaking = shouldShowBreakingBadge(post.created_at, post.is_breaking);
          const timeRemaining = getBreakingTimeRemaining(post.created_at);
          
          return (
            <Card key={post.id} className="bg-slate-800/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
                        <span>📅 {new Date(post.created_at).toLocaleDateString()}</span>
                        <span>👤 {post.author}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Badge variant={post.is_published ? 'default' : 'secondary'} className="text-xs">
                      {post.is_published ? '✅ Published' : '📝 Draft'}
                    </Badge>
                    {isStillBreaking && (
                      <Badge variant="destructive" className="text-xs bg-red-600 hover:bg-red-700">
                        🔥 Breaking
                        {timeRemaining && (
                          <span className="ml-1 text-[10px] opacity-80">
                            ({timeRemaining} left)
                          </span>
                        )}
                      </Badge>
                    )}
                    {post.is_breaking && !isStillBreaking && (
                      <Badge variant="secondary" className="text-xs bg-gray-500">
                        🔥 Expired
                      </Badge>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPost(post)}
                      className="text-xs"
                    >
                      ✏️ Edit
                    </Button>
                    <Button 
                      variant={isStillBreaking ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => toggleBreakingMutation.mutate({ id: post.id, isBreaking: post.is_breaking })}
                      disabled={toggleBreakingMutation.isPending}
                      className="text-xs"
                    >
                      {isStillBreaking ? '🔥 Remove Breaking' : '🔥 Add Breaking'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => togglePublishMutation.mutate({ id: post.id, isPublished: post.is_published })}
                      disabled={togglePublishMutation.isPending}
                      className="text-xs"
                    >
                      {post.is_published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this news post?')) {
                          deletePostMutation.mutate(post.id);
                        }
                      }}
                      disabled={deletePostMutation.isPending}
                      className="text-xs"
                    >
                      🗑️
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {(!newsPosts || newsPosts.length === 0) && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No news posts yet. Create your first news post!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminNews;
