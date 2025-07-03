export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          phone: string | null
          location: string | null
          website: string | null
          social_links: Json | null
          preferences: Json | null
          role: 'user' | 'admin' | 'moderator'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          phone?: string | null
          location?: string | null
          website?: string | null
          social_links?: Json | null
          preferences?: Json | null
          role?: 'user' | 'admin' | 'moderator'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          phone?: string | null
          location?: string | null
          website?: string | null
          social_links?: Json | null
          preferences?: Json | null
          role?: 'user' | 'admin' | 'moderator'
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: 'draft' | 'active' | 'paused' | 'completed'
          type: 'email' | 'social' | 'multi-channel'
          flow_data: Json | null
          target_audience: Json | null
          budget: number | null
          start_date: string | null
          end_date: string | null
          metrics: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          status?: 'draft' | 'active' | 'paused' | 'completed'
          type?: 'email' | 'social' | 'multi-channel'
          flow_data?: Json | null
          target_audience?: Json | null
          budget?: number | null
          start_date?: string | null
          end_date?: string | null
          metrics?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: 'draft' | 'active' | 'paused' | 'completed'
          type?: 'email' | 'social' | 'multi-channel'
          flow_data?: Json | null
          target_audience?: Json | null
          budget?: number | null
          start_date?: string | null
          end_date?: string | null
          metrics?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      content_collection: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          type: 'text' | 'image' | 'video' | 'document'
          tags: string[] | null
          metadata: Json | null
          file_url: string | null
          file_size: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          type?: 'text' | 'image' | 'video' | 'document'
          tags?: string[] | null
          metadata?: Json | null
          file_url?: string | null
          file_size?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          type?: 'text' | 'image' | 'video' | 'document'
          tags?: string[] | null
          metadata?: Json | null
          file_url?: string | null
          file_size?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      social_accounts: {
        Row: {
          id: string
          user_id: string
          platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube'
          account_id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          access_token: string
          refresh_token: string | null
          token_expires_at: string | null
          is_active: boolean
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube'
          account_id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          access_token: string
          refresh_token?: string | null
          token_expires_at?: string | null
          is_active?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform?: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube'
          account_id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          access_token?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          is_active?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      schedules: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          type: 'campaign' | 'content' | 'meeting' | 'reminder'
          scheduled_for: string
          timezone: string
          is_recurring: boolean
          recurrence_pattern: Json | null
          status: 'scheduled' | 'completed' | 'cancelled'
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          type?: 'campaign' | 'content' | 'meeting' | 'reminder'
          scheduled_for: string
          timezone?: string
          is_recurring?: boolean
          recurrence_pattern?: Json | null
          status?: 'scheduled' | 'completed' | 'cancelled'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          type?: 'campaign' | 'content' | 'meeting' | 'reminder'
          scheduled_for?: string
          timezone?: string
          is_recurring?: boolean
          recurrence_pattern?: Json | null
          status?: 'scheduled' | 'completed' | 'cancelled'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      law_of_attraction_analyses: {
        Row: {
          id: string
          user_id: string
          form_data: Json
          analysis_results: Json
          score: number
          recommendations: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          form_data: Json
          analysis_results: Json
          score: number
          recommendations: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          form_data?: Json
          analysis_results?: Json
          score?: number
          recommendations?: Json
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          author_id: string
          published: boolean
          featured_image: string | null
          tags: string[] | null
          meta_title: string | null
          meta_description: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          author_id: string
          published?: boolean
          featured_image?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          author_id?: string
          published?: boolean
          featured_image?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
