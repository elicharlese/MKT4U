import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed blog posts
    const blogPosts = [
      {
        title: 'Getting Started with AI-Powered Marketing',
        slug: 'getting-started-ai-marketing',
        content: `# Getting Started with AI-Powered Marketing

In today's digital landscape, artificial intelligence is revolutionizing how businesses approach marketing. From personalized content creation to predictive analytics, AI tools are helping marketers achieve better results with less effort.

## Why AI Marketing Matters

AI-powered marketing offers several key advantages:

- **Personalization at Scale**: Create tailored experiences for thousands of customers
- **Data-Driven Insights**: Make decisions based on real-time analytics
- **Automation**: Free up time for strategic thinking
- **Improved ROI**: Optimize campaigns for better performance

## Getting Started

To begin your AI marketing journey:

1. **Audit Your Current Strategy**: Understand what's working and what isn't
2. **Identify Opportunities**: Look for repetitive tasks that can be automated
3. **Choose the Right Tools**: Select AI solutions that fit your business needs
4. **Start Small**: Begin with one area and expand gradually
5. **Measure Results**: Track performance and adjust accordingly

Ready to transform your marketing with AI? Start your journey today with MKT4U.`,
        excerpt: 'Discover how AI-powered marketing can transform your business strategy and drive better results.',
        author_id: '00000000-0000-0000-0000-000000000000', // Will be updated with real admin ID
        published: true,
        featured_image: '/placeholder.jpg',
        tags: ['AI', 'Marketing', 'Getting Started'],
        meta_title: 'Getting Started with AI-Powered Marketing | MKT4U',
        meta_description: 'Learn how to leverage AI for marketing success. Discover tools, strategies, and best practices for AI-powered marketing campaigns.',
        published_at: new Date().toISOString(),
      },
      {
        title: 'The Power of Law of Attraction in Business',
        slug: 'law-of-attraction-business',
        content: `# The Power of Law of Attraction in Business

The Law of Attraction isn't just about personal development—it's a powerful tool for business success. When applied correctly, it can help entrepreneurs attract the right opportunities, clients, and partnerships.

## Understanding the Business Application

In business, the Law of Attraction works through:

- **Clear Vision Setting**: Defining specific business goals
- **Aligned Action**: Taking steps that match your intentions
- **Positive Mindset**: Maintaining optimism during challenges
- **Visualization**: Seeing success before it happens

## Practical Strategies

### 1. Vision Boarding for Business
Create visual representations of your business goals, including:
- Revenue targets
- Client demographics
- Office spaces
- Team members

### 2. Affirmations for Entrepreneurs
Daily affirmations that reinforce success:
- "I attract profitable opportunities"
- "My business serves clients who value my work"
- "I make decisions with confidence and clarity"

### 3. Gratitude Practice
Regular gratitude for:
- Current clients and customers
- Business achievements
- Learning opportunities
- Team members

## Real-World Results

Many successful entrepreneurs credit the Law of Attraction for their achievements. The key is combining positive thinking with strategic action.

Start applying these principles in your business today and watch as new opportunities begin to manifest.`,
        excerpt: 'Learn how successful entrepreneurs use the Law of Attraction to build thriving businesses.',
        author_id: '00000000-0000-0000-0000-000000000000',
        published: true,
        featured_image: '/placeholder.jpg',
        tags: ['Law of Attraction', 'Business', 'Success'],
        meta_title: 'Law of Attraction for Business Success | MKT4U',
        meta_description: 'Discover how to apply Law of Attraction principles to attract business success, clients, and opportunities.',
        published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      },
      {
        title: 'Social Media Automation Best Practices',
        slug: 'social-media-automation-best-practices',
        content: `# Social Media Automation Best Practices

Social media automation can save time and improve consistency, but it needs to be done right to maintain authentic engagement with your audience.

## The Benefits of Automation

Smart automation helps with:
- **Consistent Posting**: Maintain regular content schedules
- **Time Management**: Focus on strategy instead of posting
- **Multi-Platform Management**: Handle multiple accounts efficiently
- **Analytics Tracking**: Monitor performance across channels

## Best Practices

### 1. Maintain Authenticity
- Use automation for scheduling, not all interactions
- Personalize responses when possible
- Share behind-the-scenes content
- Respond to comments and messages personally

### 2. Content Quality Over Quantity
- Focus on valuable, engaging content
- Mix automated and real-time posts
- Use automation for evergreen content
- Save breaking news and trends for manual posting

### 3. Platform-Specific Strategies
Each platform has unique requirements:
- **Instagram**: Visual content, Stories, Reels
- **Twitter**: Real-time engagement, trending topics
- **LinkedIn**: Professional content, industry insights
- **Facebook**: Community building, longer-form content

## Tools and Techniques

Popular automation tools include:
- Buffer for scheduling
- Hootsuite for management
- Zapier for workflow automation
- MKT4U for AI-powered content creation

Remember: automation should enhance, not replace, genuine human connection with your audience.`,
        excerpt: 'Master social media automation while maintaining authentic engagement with your audience.',
        author_id: '00000000-0000-0000-0000-000000000000',
        published: true,
        featured_image: '/placeholder.jpg',
        tags: ['Social Media', 'Automation', 'Marketing'],
        meta_title: 'Social Media Automation Best Practices | MKT4U',
        meta_description: 'Learn how to automate social media effectively while keeping your brand authentic and engaging.',
        published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      },
    ];

    // Insert blog posts
    const { error: blogError } = await supabase
      .from('blog_posts')
      .insert(blogPosts);

    if (blogError) {
      console.error('❌ Error seeding blog posts:', blogError);
    } else {
      console.log('✅ Blog posts seeded successfully');
    }

    // Create sample campaign templates (these would be created by admin)
    const campaignTemplates = [
      {
        title: 'Welcome Email Series',
        description: 'A 5-part email series to welcome new subscribers and introduce your brand.',
        type: 'email',
        flow_data: {
          emails: [
            { subject: 'Welcome to our community!', delay: 0 },
            { subject: 'Here\'s what you can expect', delay: 1 },
            { subject: 'Our story and mission', delay: 3 },
            { subject: 'Popular resources to get started', delay: 7 },
            { subject: 'Let\'s connect on social media', delay: 14 },
          ],
        },
        target_audience: {
          segment: 'new_subscribers',
          criteria: 'signed_up_last_7_days',
        },
        user_id: '00000000-0000-0000-0000-000000000000', // Template user
      },
      {
        title: 'Product Launch Campaign',
        description: 'Multi-channel campaign for launching a new product or service.',
        type: 'multi-channel',
        flow_data: {
          phases: [
            { name: 'Teaser', duration: 7, channels: ['social', 'email'] },
            { name: 'Announcement', duration: 3, channels: ['social', 'email', 'blog'] },
            { name: 'Launch', duration: 1, channels: ['all'] },
            { name: 'Follow-up', duration: 14, channels: ['email', 'social'] },
          ],
        },
        target_audience: {
          segment: 'existing_customers',
          criteria: 'engaged_last_30_days',
        },
        user_id: '00000000-0000-0000-0000-000000000000',
      },
    ];

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
