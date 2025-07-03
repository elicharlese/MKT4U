import nodemailer from 'nodemailer';
import { Database } from '@/types/database';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST!,
  port: parseInt(process.env.SMTP_PORT!),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

export interface EmailOptions {
  to: string;
  from?: string;
  template: EmailTemplate;
  variables?: Record<string, string>;
}

/**
 * Send email with template processing
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Process template variables
    let { subject, html, text } = options.template;
    
    if (options.variables) {
      Object.entries(options.variables).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        subject = subject.replace(new RegExp(placeholder, 'g'), value);
        html = html.replace(new RegExp(placeholder, 'g'), value);
        if (text) {
          text = text.replace(new RegExp(placeholder, 'g'), value);
        }
      });
    }

    const mailOptions = {
      from: options.from || process.env.SMTP_USER!,
      to: options.to,
      subject,
      html,
      text,
    };

    await transporter.sendMail(mailOptions);
    
    // Log email sent
    console.log(`Email sent successfully to ${options.to}`);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

/**
 * Email templates
 */
export const emailTemplates = {
  welcome: {
    subject: 'Welcome to MKT4U - Your AI Marketing Journey Starts Now!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to MKT4U, {{name}}!</h1>
        <p>We're excited to have you join our AI-powered marketing platform.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2>Get Started:</h2>
          <ul>
            <li>Complete your profile setup</li>
            <li>Connect your social media accounts</li>
            <li>Create your first campaign</li>
            <li>Try our Law of Attraction analyzer</li>
          </ul>
        </div>
        
        <p>If you have any questions, don't hesitate to reach out to our support team.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{app_url}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            Get Started
          </a>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">
          Best regards,<br>
          The MKT4U Team
        </p>
      </div>
    `,
  },

  passwordReset: {
    subject: 'Reset Your MKT4U Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Password Reset Request</h1>
        <p>Hi {{name}},</p>
        <p>You requested to reset your password for your MKT4U account.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{reset_url}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            Reset Password
          </a>
        </div>
        
        <p style="color: #64748b;">This link will expire in 24 hours.</p>
        <p style="color: #64748b;">If you didn't request this, please ignore this email.</p>
        
        <p style="color: #64748b; font-size: 14px;">
          Best regards,<br>
          The MKT4U Team
        </p>
      </div>
    `,
  },

  campaignComplete: {
    subject: 'Campaign "{{campaign_name}}" Completed - Results Inside',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Campaign Completed! 🎉</h1>
        <p>Hi {{name}},</p>
        <p>Your campaign "<strong>{{campaign_name}}</strong>" has completed successfully!</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2>Campaign Results:</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <strong>Total Views:</strong> {{total_views}}<br>
              <strong>Total Clicks:</strong> {{total_clicks}}<br>
              <strong>Conversions:</strong> {{total_conversions}}
            </div>
            <div>
              <strong>ROI:</strong> {{roi}}%<br>
              <strong>CTR:</strong> {{ctr}}%<br>
              <strong>Conversion Rate:</strong> {{conversion_rate}}%
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{campaign_url}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            View Full Report
          </a>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">
          Best regards,<br>
          The MKT4U Team
        </p>
      </div>
    `,
  },

  weeklyReport: {
    subject: 'Your Weekly Marketing Report - {{week_ending}}',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Weekly Marketing Report</h1>
        <p>Hi {{name}},</p>
        <p>Here's your marketing performance summary for the week ending {{week_ending}}:</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2>This Week's Highlights:</h2>
          <ul>
            <li><strong>Active Campaigns:</strong> {{active_campaigns}}</li>
            <li><strong>Total Reach:</strong> {{total_reach}}</li>
            <li><strong>New Leads:</strong> {{new_leads}}</li>
            <li><strong>Content Created:</strong> {{content_count}} pieces</li>
          </ul>
          
          <h3>Top Performing Campaign:</h3>
          <p><strong>{{top_campaign}}</strong> - {{top_campaign_metric}}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{dashboard_url}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            View Dashboard
          </a>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">
          Best regards,<br>
          The MKT4U Team
        </p>
      </div>
    `,
  },
};

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean> {
  return sendEmail({
    to: userEmail,
    template: emailTemplates.welcome,
    variables: {
      name: userName,
      app_url: `${process.env.NEXTAUTH_URL}/app`,
    },
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  userEmail: string,
  userName: string,
  resetToken: string
): Promise<boolean> {
  return sendEmail({
    to: userEmail,
    template: emailTemplates.passwordReset,
    variables: {
      name: userName,
      reset_url: `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`,
    },
  });
}

/**
 * Send campaign completion email
 */
export async function sendCampaignCompleteEmail(
  userEmail: string,
  userName: string,
  campaignData: {
    name: string;
    id: string;
    totalViews: number;
    totalClicks: number;
    totalConversions: number;
    roi: number;
    ctr: number;
    conversionRate: number;
  }
): Promise<boolean> {
  return sendEmail({
    to: userEmail,
    template: emailTemplates.campaignComplete,
    variables: {
      name: userName,
      campaign_name: campaignData.name,
      total_views: campaignData.totalViews.toLocaleString(),
      total_clicks: campaignData.totalClicks.toLocaleString(),
      total_conversions: campaignData.totalConversions.toLocaleString(),
      roi: campaignData.roi.toFixed(1),
      ctr: campaignData.ctr.toFixed(2),
      conversion_rate: campaignData.conversionRate.toFixed(2),
      campaign_url: `${process.env.NEXTAUTH_URL}/app/campaigns/${campaignData.id}`,
    },
  });
}

/**
 * Queue email for later sending (useful for scheduled emails)
 */
export async function queueEmail(
  options: EmailOptions,
  sendAt: Date
): Promise<string> {
  const { data, error } = await supabase
    .from('email_queue')
    .insert({
      to_email: options.to,
      from_email: options.from,
      subject: options.template.subject,
      html_content: options.template.html,
      text_content: options.template.text,
      variables: options.variables || {},
      scheduled_for: sendAt.toISOString(),
      status: 'queued',
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to queue email: ${error.message}`);
  }

  return data.id;
}
