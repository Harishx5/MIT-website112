export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          reference_id: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          reference_id?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          reference_id?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      admin_portfolio_projects: {
        Row: {
          category: string
          challenge: string | null
          client: string | null
          completion_date: string | null
          created_at: string
          created_by: string | null
          description: string
          duration: string | null
          features: string[] | null
          id: string
          image: string | null
          results: Json | null
          solution: string | null
          team: string | null
          technologies: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          challenge?: string | null
          client?: string | null
          completion_date?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          duration?: string | null
          features?: string[] | null
          id?: string
          image?: string | null
          results?: Json | null
          solution?: string | null
          team?: string | null
          technologies?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          challenge?: string | null
          client?: string | null
          completion_date?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          duration?: string | null
          features?: string[] | null
          id?: string
          image?: string | null
          results?: Json | null
          solution?: string | null
          team?: string | null
          technologies?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          event_name: string
          event_type: string
          id: string
          ip_address: unknown
          page_url: string | null
          properties: Json | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          event_name: string
          event_type: string
          id?: string
          ip_address?: unknown
          page_url?: string | null
          properties?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          event_name?: string
          event_type?: string
          id?: string
          ip_address?: unknown
          page_url?: string | null
          properties?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_comments: {
        Row: {
          blog_id: string
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          likes_count: number | null
          parent_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          blog_id: string
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          likes_count?: number | null
          parent_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          blog_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          likes_count?: number | null
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "blog_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string | null
          date: string | null
          excerpt: string | null
          id: string
          image: string | null
          is_published: boolean | null
          likes_count: number | null
          meta_description: string | null
          reading_time: number | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          likes_count?: number | null
          meta_description?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          likes_count?: number | null
          meta_description?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          challenge_description: string | null
          challenge_pain_points: string[] | null
          challenge_title: string | null
          client: string | null
          created_at: string | null
          display_order: number | null
          duration: string | null
          id: string
          image_url: string | null
          industry: string | null
          is_published: boolean | null
          project_overview: string | null
          results_client_role: string | null
          results_metrics: Json | null
          results_testimonial: string | null
          solution_approach: string[] | null
          solution_description: string | null
          solution_title: string | null
          team_size: string | null
          technologies: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          challenge_description?: string | null
          challenge_pain_points?: string[] | null
          challenge_title?: string | null
          client?: string | null
          created_at?: string | null
          display_order?: number | null
          duration?: string | null
          id?: string
          image_url?: string | null
          industry?: string | null
          is_published?: boolean | null
          project_overview?: string | null
          results_client_role?: string | null
          results_metrics?: Json | null
          results_testimonial?: string | null
          solution_approach?: string[] | null
          solution_description?: string | null
          solution_title?: string | null
          team_size?: string | null
          technologies?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          challenge_description?: string | null
          challenge_pain_points?: string[] | null
          challenge_title?: string | null
          client?: string | null
          created_at?: string | null
          display_order?: number | null
          duration?: string | null
          id?: string
          image_url?: string | null
          industry?: string | null
          is_published?: boolean | null
          project_overview?: string | null
          results_client_role?: string | null
          results_metrics?: Json | null
          results_testimonial?: string | null
          solution_approach?: string[] | null
          solution_description?: string | null
          solution_title?: string | null
          team_size?: string | null
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          admin_notes: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          subject: string
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string | null
          html_content: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_type: string | null
          text_content: string | null
          updated_at: string | null
          variables: string[] | null
        }
        Insert: {
          created_at?: string | null
          html_content: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_type?: string | null
          text_content?: string | null
          updated_at?: string | null
          variables?: string[] | null
        }
        Update: {
          created_at?: string | null
          html_content?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_type?: string | null
          text_content?: string | null
          updated_at?: string | null
          variables?: string[] | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string | null
          display_order: number | null
          helpful_count: number | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          question: string
          tags: string[] | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          answer: string
          category: string
          created_at?: string | null
          display_order?: number | null
          helpful_count?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          question: string
          tags?: string[] | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string | null
          display_order?: number | null
          helpful_count?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          question?: string
          tags?: string[] | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      intern_certificates: {
        Row: {
          certificate_code: string
          certificate_url: string | null
          college: string | null
          created_at: string
          degree: string | null
          duration: string | null
          email: string | null
          end_date: string | null
          id: string
          intern_name: string
          internship_program: string
          is_active: boolean | null
          mentor: string | null
          performance_grade: string | null
          phone: string | null
          project_description: string | null
          project_title: string | null
          start_date: string | null
          technologies: string[] | null
          updated_at: string
        }
        Insert: {
          certificate_code: string
          certificate_url?: string | null
          college?: string | null
          created_at?: string
          degree?: string | null
          duration?: string | null
          email?: string | null
          end_date?: string | null
          id?: string
          intern_name: string
          internship_program: string
          is_active?: boolean | null
          mentor?: string | null
          performance_grade?: string | null
          phone?: string | null
          project_description?: string | null
          project_title?: string | null
          start_date?: string | null
          technologies?: string[] | null
          updated_at?: string
        }
        Update: {
          certificate_code?: string
          certificate_url?: string | null
          college?: string | null
          created_at?: string
          degree?: string | null
          duration?: string | null
          email?: string | null
          end_date?: string | null
          id?: string
          intern_name?: string
          internship_program?: string
          is_active?: boolean | null
          mentor?: string | null
          performance_grade?: string | null
          phone?: string | null
          project_description?: string | null
          project_title?: string | null
          start_date?: string | null
          technologies?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      internship_applications: {
        Row: {
          admin_notes: string | null
          applied_position: string
          availability_end: string | null
          availability_start: string | null
          cgpa: string | null
          college_name: string | null
          cover_letter: string | null
          created_at: string | null
          degree: string | null
          email: string
          github_url: string | null
          id: string
          internship_posting_id: string | null
          linkedin_url: string | null
          name: string
          phone: string | null
          portfolio_url: string | null
          resume_url: string | null
          skills: string[] | null
          status: string | null
          updated_at: string | null
          year_of_study: string | null
        }
        Insert: {
          admin_notes?: string | null
          applied_position: string
          availability_end?: string | null
          availability_start?: string | null
          cgpa?: string | null
          college_name?: string | null
          cover_letter?: string | null
          created_at?: string | null
          degree?: string | null
          email: string
          github_url?: string | null
          id?: string
          internship_posting_id?: string | null
          linkedin_url?: string | null
          name: string
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string | null
          year_of_study?: string | null
        }
        Update: {
          admin_notes?: string | null
          applied_position?: string
          availability_end?: string | null
          availability_start?: string | null
          cgpa?: string | null
          college_name?: string | null
          cover_letter?: string | null
          created_at?: string | null
          degree?: string | null
          email?: string
          github_url?: string | null
          id?: string
          internship_posting_id?: string | null
          linkedin_url?: string | null
          name?: string
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string | null
          year_of_study?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "internship_applications_internship_posting_id_fkey"
            columns: ["internship_posting_id"]
            isOneToOne: false
            referencedRelation: "internship_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      internship_postings: {
        Row: {
          application_count: number | null
          created_at: string
          deadline: string | null
          department: string
          description: string
          duration: string
          experience_level: string
          id: string
          is_active: boolean | null
          learning_outcomes: string[] | null
          location: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          stipend_range: string | null
          title: string
          updated_at: string
          vacancy_count: number | null
        }
        Insert: {
          application_count?: number | null
          created_at?: string
          deadline?: string | null
          department: string
          description: string
          duration: string
          experience_level: string
          id?: string
          is_active?: boolean | null
          learning_outcomes?: string[] | null
          location?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          stipend_range?: string | null
          title: string
          updated_at?: string
          vacancy_count?: number | null
        }
        Update: {
          application_count?: number | null
          created_at?: string
          deadline?: string | null
          department?: string
          description?: string
          duration?: string
          experience_level?: string
          id?: string
          is_active?: boolean | null
          learning_outcomes?: string[] | null
          location?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          stipend_range?: string | null
          title?: string
          updated_at?: string
          vacancy_count?: number | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          admin_notes: string | null
          applied_position: string
          cover_letter: string | null
          created_at: string | null
          custom_role: string | null
          deadline: string | null
          department: string | null
          email: string
          experience_level: string | null
          experience_required: string | null
          github_url: string | null
          id: string
          is_active: boolean | null
          job_description: string | null
          job_posting_id: string | null
          job_type: string | null
          linkedin_url: string | null
          location: string | null
          name: string
          phone: string | null
          portfolio_url: string | null
          requirements: string[] | null
          resume_url: string | null
          role_type: string
          salary_range: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          applied_position: string
          cover_letter?: string | null
          created_at?: string | null
          custom_role?: string | null
          deadline?: string | null
          department?: string | null
          email: string
          experience_level?: string | null
          experience_required?: string | null
          github_url?: string | null
          id?: string
          is_active?: boolean | null
          job_description?: string | null
          job_posting_id?: string | null
          job_type?: string | null
          linkedin_url?: string | null
          location?: string | null
          name: string
          phone?: string | null
          portfolio_url?: string | null
          requirements?: string[] | null
          resume_url?: string | null
          role_type: string
          salary_range?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          applied_position?: string
          cover_letter?: string | null
          created_at?: string | null
          custom_role?: string | null
          deadline?: string | null
          department?: string | null
          email?: string
          experience_level?: string | null
          experience_required?: string | null
          github_url?: string | null
          id?: string
          is_active?: boolean | null
          job_description?: string | null
          job_posting_id?: string | null
          job_type?: string | null
          linkedin_url?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          portfolio_url?: string | null
          requirements?: string[] | null
          resume_url?: string | null
          role_type?: string
          salary_range?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          application_count: number | null
          benefits: string[] | null
          created_at: string
          deadline: string | null
          department: string
          description: string
          experience_level: string
          id: string
          is_active: boolean | null
          job_type: string
          location: string | null
          multiple_choice_questions: Json | null
          requirements: string[] | null
          responsibilities: string[] | null
          salary_range: string | null
          title: string
          updated_at: string
          vacancy_count: number | null
        }
        Insert: {
          application_count?: number | null
          benefits?: string[] | null
          created_at?: string
          deadline?: string | null
          department: string
          description: string
          experience_level: string
          id?: string
          is_active?: boolean | null
          job_type: string
          location?: string | null
          multiple_choice_questions?: Json | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_range?: string | null
          title: string
          updated_at?: string
          vacancy_count?: number | null
        }
        Update: {
          application_count?: number | null
          benefits?: string[] | null
          created_at?: string
          deadline?: string | null
          department?: string
          description?: string
          experience_level?: string
          id?: string
          is_active?: boolean | null
          job_type?: string
          location?: string | null
          multiple_choice_questions?: Json | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_range?: string | null
          title?: string
          updated_at?: string
          vacancy_count?: number | null
        }
        Relationships: []
      }
      news: {
        Row: {
          author: string | null
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image: string | null
          is_breaking: boolean | null
          is_published: boolean | null
          likes_count: number | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          author?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image?: string | null
          is_breaking?: boolean | null
          is_published?: boolean | null
          likes_count?: number | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          author?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image?: string | null
          is_breaking?: boolean | null
          is_published?: boolean | null
          likes_count?: number | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      news_comments: {
        Row: {
          author_email: string | null
          author_name: string | null
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          likes_count: number | null
          news_id: string
          parent_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          author_email?: string | null
          author_name?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          likes_count?: number | null
          news_id: string
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          author_email?: string | null
          author_name?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          likes_count?: number | null
          news_id?: string
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "news_comments_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "news_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "news_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      news_views: {
        Row: {
          device_fingerprint: string | null
          id: string
          ip_address: unknown
          news_id: string
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          device_fingerprint?: string | null
          id?: string
          ip_address?: unknown
          news_id: string
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          device_fingerprint?: string | null
          id?: string
          ip_address?: unknown
          news_id?: string
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "news_views_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          name: string | null
          preferences: Json | null
          subscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          preferences?: Json | null
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          preferences?: Json | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      portfolio_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          project_count: number | null
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          project_count?: number | null
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          project_count?: number | null
          slug?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          category: string
          client_name: string | null
          completion_date: string | null
          created_at: string | null
          demo_link: string | null
          description: string
          github_link: string | null
          id: string
          image: string
          is_featured: boolean | null
          is_published: boolean | null
          likes_count: number | null
          long_description: string | null
          project_duration: string | null
          sort_order: number | null
          technologies: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          category: string
          client_name?: string | null
          completion_date?: string | null
          created_at?: string | null
          demo_link?: string | null
          description: string
          github_link?: string | null
          id?: string
          image: string
          is_featured?: boolean | null
          is_published?: boolean | null
          likes_count?: number | null
          long_description?: string | null
          project_duration?: string | null
          sort_order?: number | null
          technologies?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          category?: string
          client_name?: string | null
          completion_date?: string | null
          created_at?: string | null
          demo_link?: string | null
          description?: string
          github_link?: string | null
          id?: string
          image?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          likes_count?: number | null
          long_description?: string | null
          project_duration?: string | null
          sort_order?: number | null
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          preferences: Json | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          preferences?: Json | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          preferences?: Json | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      project_inquiries: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          budget_range: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          priority: string | null
          project_description: string
          requirements: Json | null
          service_type: string
          status: string | null
          timeline: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          priority?: string | null
          project_description: string
          requirements?: Json | null
          service_type: string
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          priority?: string | null
          project_description?: string
          requirements?: Json | null
          service_type?: string
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_inquiries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          avatar: string | null
          comment: string
          company: string | null
          created_at: string | null
          helpful_votes: number | null
          id: string
          is_featured: boolean | null
          is_verified: boolean | null
          name: string | null
          rating: number
          service_type: string | null
          user_id: string | null
        }
        Insert: {
          avatar?: string | null
          comment: string
          company?: string | null
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          name?: string | null
          rating?: number
          service_type?: string | null
          user_id?: string | null
        }
        Update: {
          avatar?: string | null
          comment?: string
          company?: string | null
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          name?: string | null
          rating?: number
          service_type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string | null
          created_at: string | null
          delivery_time: string | null
          display_order: number | null
          features: string[] | null
          icon: string | null
          id: string
          image: string | null
          is_active: boolean | null
          is_featured: boolean | null
          long_description: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          price_range: string | null
          short_description: string
          slug: string
          starting_price: number | null
          technologies: string[] | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          delivery_time?: string | null
          display_order?: number | null
          features?: string[] | null
          icon?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          price_range?: string | null
          short_description: string
          slug: string
          starting_price?: number | null
          technologies?: string[] | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          delivery_time?: string | null
          display_order?: number | null
          features?: string[] | null
          icon?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          price_range?: string | null
          short_description?: string
          slug?: string
          starting_price?: number | null
          technologies?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      support_inquiries: {
        Row: {
          admin_notes: string | null
          category: string
          created_at: string
          email: string
          id: string
          issue_details: string
          name: string
          priority: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          category: string
          created_at?: string
          email: string
          id?: string
          issue_details: string
          name: string
          priority?: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          category?: string
          created_at?: string
          email?: string
          id?: string
          issue_details?: string
          name?: string
          priority?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      support_ticket_replies: {
        Row: {
          created_at: string
          id: string
          is_internal: boolean
          message: string
          sender_email: string
          sender_id: string | null
          sender_name: string
          sender_type: string
          ticket_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_internal?: boolean
          message: string
          sender_email: string
          sender_id?: string | null
          sender_name: string
          sender_type: string
          ticket_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_internal?: boolean
          message?: string
          sender_email?: string
          sender_id?: string | null
          sender_name?: string
          sender_type?: string
          ticket_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_replies_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string | null
          display_order: number | null
          email: string | null
          github_url: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          linkedin_url: string | null
          name: string
          position: string
          skills: string[] | null
          twitter_url: string | null
          years_experience: number | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          email?: string | null
          github_url?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          linkedin_url?: string | null
          name: string
          position: string
          skills?: string[] | null
          twitter_url?: string | null
          years_experience?: number | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          email?: string | null
          github_url?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          linkedin_url?: string | null
          name?: string
          position?: string
          skills?: string[] | null
          twitter_url?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_name: string
          client_position: string | null
          company_logo: string | null
          company_name: string
          created_at: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          project_type: string | null
          rating: number | null
          testimonial_text: string
        }
        Insert: {
          client_name: string
          client_position?: string | null
          company_logo?: string | null
          company_name: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          project_type?: string | null
          rating?: number | null
          testimonial_text: string
        }
        Update: {
          client_name?: string
          client_position?: string | null
          company_logo?: string | null
          company_name?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          project_type?: string | null
          rating?: number | null
          testimonial_text?: string
        }
        Relationships: []
      }
      trusted_companies: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean | null
          logo_url: string
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url: string
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      trusted_partners: {
        Row: {
          achievements: string | null
          category: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          employees: string | null
          founded: string | null
          hero_image_url: string | null
          hero_image_urls: string[]
          id: string
          info_image_url: string | null
          is_active: boolean | null
          location: string | null
          logo_url: string
          long_description: string | null
          name: string
          partner_since: string | null
          services: string[] | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          achievements?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          employees?: string | null
          founded?: string | null
          hero_image_url?: string | null
          hero_image_urls?: string[]
          id?: string
          info_image_url?: string | null
          is_active?: boolean | null
          location?: string | null
          logo_url: string
          long_description?: string | null
          name: string
          partner_since?: string | null
          services?: string[] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          achievements?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          employees?: string | null
          founded?: string | null
          hero_image_url?: string | null
          hero_image_urls?: string[]
          id?: string
          info_image_url?: string | null
          is_active?: boolean | null
          location?: string | null
          logo_url?: string
          long_description?: string | null
          name?: string
          partner_since?: string | null
          services?: string[] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      user_activity_logs: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string | null
          id: string
          ip_address: unknown
          metadata: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_fingerprint: string | null
          id: string
          ip_address: unknown
          is_active: boolean | null
          last_activity: string | null
          session_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_fingerprint?: string | null
          id?: string
          ip_address?: unknown
          is_active?: boolean | null
          last_activity?: string | null
          session_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_fingerprint?: string | null
          id?: string
          ip_address?: unknown
          is_active?: boolean | null
          last_activity?: string | null
          session_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_slug: { Args: { title_text: string }; Returns: string }
      get_admin_dashboard_summary: {
        Args: never
        Returns: {
          avg_rating: number
          new_contacts_week: number
          new_inquiries_week: number
          total_blogs: number
          total_contacts: number
          total_inquiries: number
          total_reviews: number
          total_users: number
        }[]
      }
      get_all_auth_users: {
        Args: never
        Returns: {
          confirmation_sent_at: string
          confirmation_token: string
          created_at: string
          email: string
          email_change: string
          email_change_sent_at: string
          email_change_token_new: string
          email_confirmed: boolean
          email_confirmed_at: string
          id: string
          invited_at: string
          is_super_admin: boolean
          last_sign_in_at: string
          phone: string
          raw_app_meta_data: Json
          raw_user_meta_data: Json
          recovery_sent_at: string
          recovery_token: string
          role: string
          updated_at: string
        }[]
      }
      get_all_users_with_activity: {
        Args: never
        Returns: {
          active_sessions: number
          confirmation_sent_at: string
          confirmation_token: string
          created_at: string
          email: string
          email_change: string
          email_change_sent_at: string
          email_change_token_new: string
          email_confirmed: boolean
          email_confirmed_at: string
          id: string
          invited_at: string
          is_super_admin: boolean
          last_activity: string
          last_sign_in_at: string
          phone: string
          raw_app_meta_data: Json
          raw_user_meta_data: Json
          recovery_sent_at: string
          recovery_token: string
          role: string
          total_activities: number
          total_sessions: number
          updated_at: string
        }[]
      }
      get_blog_stats: {
        Args: never
        Returns: {
          avg_reading_time: number
          published_blogs: number
          total_blogs: number
          total_likes: number
          total_views: number
        }[]
      }
      get_popular_content: {
        Args: never
        Returns: {
          content_type: string
          created_at: string
          id: string
          likes_count: number
          title: string
          view_count: number
        }[]
      }
      get_portfolio_stats: {
        Args: never
        Returns: {
          categories_count: number
          featured_projects: number
          published_projects: number
          total_projects: number
          total_views: number
        }[]
      }
      get_review_stats: {
        Args: never
        Returns: {
          average_rating: number
          featured_reviews: number
          five_star_reviews: number
          total_reviews: number
        }[]
      }
      get_user_activity_history: {
        Args: {
          limit_count?: number
          offset_count?: number
          user_id_param: string
        }
        Returns: {
          activity_type: string
          created_at: string
          description: string
          id: string
          ip_address: unknown
          metadata: Json
          user_agent: string
        }[]
      }
      get_user_activity_summary: {
        Args: { user_id_param: string }
        Returns: {
          activity_types: string[]
          comment_count: number
          last_activity: string
          project_inquiry_count: number
          review_count: number
          total_activities: number
          user_id: string
        }[]
      }
      get_user_session_history: {
        Args: {
          limit_count?: number
          offset_count?: number
          user_id_param: string
        }
        Returns: {
          created_at: string
          device_fingerprint: string
          id: string
          ip_address: unknown
          is_active: boolean
          last_activity: string
          session_id: string
          user_agent: string
        }[]
      }
      get_user_session_summary: {
        Args: { user_id_param: string }
        Returns: {
          active_sessions: number
          last_activity: string
          last_login: string
          total_sessions: number
          unique_devices: number
          user_id: string
        }[]
      }
      increment_view_count: {
        Args: { record_id: string; table_name: string }
        Returns: undefined
      }
      remove_expired_breaking_news: { Args: never; Returns: undefined }
      search_blogs: {
        Args: { limit_count?: number; search_query: string }
        Returns: {
          author: string
          category: string
          created_at: string
          excerpt: string
          id: string
          rank: number
          reading_time: number
          title: string
        }[]
      }
      swap_service_display_order: {
        Args: { new_display_order: number; service_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
