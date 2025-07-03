import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { sendEmail, emailTemplates } from './email';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface NotificationData {
  userId: string;
  type: 'campaign_complete' | 'new_lead' | 'weekly_report' | 'system_alert';
  title: string;
  message: string;
  data?: Record<string, any>;
  channels: ('email' | 'push' | 'in_app')[];
}

export interface RealtimeSubscription {
  channel: string;
  event: string;
  callback: (payload: any) => void;
}

/**
 * Realtime service for live updates
 */
export class RealtimeService {
  private subscriptions: Map<string, any> = new Map();

  /**
   * Subscribe to campaign updates
   */
  subscribeToCampaignUpdates(campaignId: string, callback: (data: any) => void) {
    const channel = supabase
      .channel(`campaign-${campaignId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'campaigns', filter: `id=eq.${campaignId}` },
        callback
      )
      .subscribe();

    this.subscriptions.set(`campaign-${campaignId}`, channel);
    return channel;
  }

  /**
   * Subscribe to user content updates
   */
  subscribeToContentUpdates(userId: string, callback: (data: any) => void) {
    const channel = supabase
      .channel(`content-${userId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'content_collection', filter: `user_id=eq.${userId}` },
        callback
      )
      .subscribe();

    this.subscriptions.set(`content-${userId}`, channel);
    return channel;
  }

  /**
   * Subscribe to schedule updates
   */
  subscribeToScheduleUpdates(userId: string, callback: (data: any) => void) {
    const channel = supabase
      .channel(`schedule-${userId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'schedules', filter: `user_id=eq.${userId}` },
        callback
      )
      .subscribe();

    this.subscriptions.set(`schedule-${userId}`, channel);
    return channel;
  }

  /**
   * Unsubscribe from updates
   */
  unsubscribe(subscriptionKey: string) {
    const channel = this.subscriptions.get(subscriptionKey);
    if (channel) {
      supabase.removeChannel(channel);
      this.subscriptions.delete(subscriptionKey);
    }
  }

  /**
   * Unsubscribe from all
   */
  unsubscribeAll() {
    this.subscriptions.forEach((channel) => {
      supabase.removeChannel(channel);
    });
    this.subscriptions.clear();
  }
}

/**
 * Notification service for sending notifications
 */
export class NotificationService {
  /**
   * Send notification to user
   */
  async sendNotification(notification: NotificationData): Promise<boolean> {
    try {
      const results = await Promise.allSettled([
        ...notification.channels.map(channel => {
          switch (channel) {
            case 'email':
              return this.sendEmailNotification(notification);
            case 'push':
              return this.sendPushNotification(notification);
            case 'in_app':
              return this.sendInAppNotification(notification);
            default:
              return Promise.resolve(false);
          }
        })
      ]);

      // Store notification in database
      await this.storeNotification(notification);

      // Return true if at least one channel succeeded
      return results.some(result => result.status === 'fulfilled' && result.value);
    } catch (error) {
      console.error('Failed to send notification:', error);
      return false;
    }
  }

  /**
   * Send email notification
   */
  private async sendEmailNotification(notification: NotificationData): Promise<boolean> {
    try {
      // Get user email
      const { data: user } = await supabase
        .from('users')
        .select('email, full_name')
        .eq('id', notification.userId)
        .single();

      if (!user) return false;

      // Choose appropriate template based on notification type
      let template = emailTemplates.welcome; // default
      let variables: Record<string, string> = {
        name: user.full_name || 'User',
        title: notification.title,
        message: notification.message,
      };

      switch (notification.type) {
        case 'campaign_complete':
          template = emailTemplates.campaignComplete;
          variables = {
            ...variables,
            campaign_name: notification.data?.campaignName || 'Your Campaign',
            total_views: notification.data?.totalViews?.toLocaleString() || '0',
            total_clicks: notification.data?.totalClicks?.toLocaleString() || '0',
            total_conversions: notification.data?.totalConversions?.toLocaleString() || '0',
            roi: notification.data?.roi?.toFixed(1) || '0',
            ctr: notification.data?.ctr?.toFixed(2) || '0',
            conversion_rate: notification.data?.conversionRate?.toFixed(2) || '0',
            campaign_url: `${process.env.NEXTAUTH_URL}/app/campaigns/${notification.data?.campaignId}`,
          };
          break;
        case 'weekly_report':
          template = emailTemplates.weeklyReport;
          variables = {
            ...variables,
            week_ending: notification.data?.weekEnding || new Date().toLocaleDateString(),
            active_campaigns: notification.data?.activeCampaigns?.toString() || '0',
            total_reach: notification.data?.totalReach?.toLocaleString() || '0',
            new_leads: notification.data?.newLeads?.toLocaleString() || '0',
            content_count: notification.data?.contentCount?.toString() || '0',
            top_campaign: notification.data?.topCampaign || 'N/A',
            top_campaign_metric: notification.data?.topCampaignMetric || 'N/A',
            dashboard_url: `${process.env.NEXTAUTH_URL}/app`,
          };
          break;
      }

      return await sendEmail({
        to: user.email,
        template,
        variables,
      });
    } catch (error) {
      console.error('Email notification failed:', error);
      return false;
    }
  }

  /**
   * Send push notification (placeholder for web push)
   */
  private async sendPushNotification(notification: NotificationData): Promise<boolean> {
    try {
      // In a real implementation, you would use a service like Firebase Cloud Messaging
      // or implement Web Push API
      console.log('Push notification sent:', notification.title);
      return true;
    } catch (error) {
      console.error('Push notification failed:', error);
      return false;
    }
  }

  /**
   * Send in-app notification
   */
  private async sendInAppNotification(notification: NotificationData): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: notification.userId,
          type: notification.type,
          title: notification.title,
          message: notification.message,
          data: notification.data || {},
          read: false,
          created_at: new Date().toISOString(),
        });

      return !error;
    } catch (error) {
      console.error('In-app notification failed:', error);
      return false;
    }
  }

  /**
   * Store notification in database for history
   */
  private async storeNotification(notification: NotificationData): Promise<void> {
    await supabase
      .from('notification_history')
      .insert({
        user_id: notification.userId,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        channels: notification.channels,
        data: notification.data || {},
        sent_at: new Date().toISOString(),
      });
  }

  /**
   * Get user notifications
   */
  async getUserNotifications(userId: string, limit: number = 50): Promise<any[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to get notifications:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('id', notificationId);

    return !error;
  }

  /**
   * Mark all notifications as read for user
   */
  async markAllAsRead(userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('read', false);

    return !error;
  }
}

// Export singleton instances
export const realtimeService = new RealtimeService();
export const notificationService = new NotificationService();

/**
 * Helper function to send campaign completion notification
 */
export async function notifyCampaignComplete(
  userId: string,
  campaignData: {
    id: string;
    name: string;
    totalViews: number;
    totalClicks: number;
    totalConversions: number;
    roi: number;
    ctr: number;
    conversionRate: number;
  }
): Promise<boolean> {
  return notificationService.sendNotification({
    userId,
    type: 'campaign_complete',
    title: `Campaign "${campaignData.name}" Completed!`,
    message: `Your campaign has finished with ${campaignData.totalConversions} conversions and ${campaignData.roi.toFixed(1)}% ROI.`,
    data: campaignData,
    channels: ['email', 'in_app'],
  });
}

/**
 * Helper function to send weekly report
 */
export async function sendWeeklyReport(
  userId: string,
  reportData: {
    weekEnding: string;
    activeCampaigns: number;
    totalReach: number;
    newLeads: number;
    contentCount: number;
    topCampaign: string;
    topCampaignMetric: string;
  }
): Promise<boolean> {
  return notificationService.sendNotification({
    userId,
    type: 'weekly_report',
    title: 'Your Weekly Marketing Report',
    message: `This week you had ${reportData.activeCampaigns} active campaigns and reached ${reportData.totalReach.toLocaleString()} people.`,
    data: reportData,
    channels: ['email'],
  });
}
