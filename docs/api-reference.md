# MKT4U API Documentation

## Overview

MKT4U is an AI-powered marketing platform that helps businesses attract the right clients through intelligent campaign management, content creation, and analytics.

## Base URL

```
Production: https://mkt4u.vercel.app/api
Development: http://localhost:3000/api
```

## Authentication

All API endpoints (except public ones) require authentication using Bearer tokens.

```bash
Authorization: Bearer <your_access_token>
```

### Getting Access Tokens

Access tokens are obtained through the authentication endpoints:

- `POST /api/auth/signin` - Sign in with email/password
- `POST /api/auth/signup` - Create a new account

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- General API endpoints: 100 requests per minute
- Authentication endpoints: 10 requests per minute
- AI/OpenAI endpoints: 30 requests per hour
- File upload endpoints: 20 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Error Response
```json
{
  "error": "ValidationError",
  "message": "Validation failed: email is required",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Authentication Endpoints

### Sign Up
Create a new user account.

```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    }
  },
  "message": "User created successfully"
}
```

### Sign In
Authenticate an existing user.

```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "session": {
      "access_token": "jwt_token_here",
      "refresh_token": "refresh_token_here",
      "expires_at": 1640995200
    }
  },
  "message": "Sign in successful"
}
```

## Campaign Endpoints

### Get Campaigns
Retrieve all campaigns for the authenticated user.

```http
GET /api/campaigns?page=1&limit=10&sortBy=created_at&sortOrder=desc
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Summer Sale Campaign",
      "description": "Promote summer products",
      "status": "active",
      "type": "multi-channel",
      "budget": 1000,
      "start_date": "2024-06-01T00:00:00Z",
      "end_date": "2024-08-31T00:00:00Z",
      "metrics": {
        "views": 10000,
        "clicks": 500,
        "conversions": 25
      },
      "created_at": "2024-05-01T00:00:00Z",
      "updated_at": "2024-05-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### Create Campaign
Create a new marketing campaign.

```http
POST /api/campaigns
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Campaign",
  "description": "Campaign description",
  "target_audience": "Young professionals",
  "budget": 500,
  "start_date": "2024-06-01T00:00:00Z",
  "end_date": "2024-07-01T00:00:00Z"
}
```

### Get Campaign Details
Retrieve details for a specific campaign.

```http
GET /api/campaigns/{campaign_id}
Authorization: Bearer <token>
```

### Update Campaign
Update an existing campaign.

```http
PUT /api/campaigns/{campaign_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Campaign Title",
  "status": "paused"
}
```

### Delete Campaign
Delete a campaign.

```http
DELETE /api/campaigns/{campaign_id}
Authorization: Bearer <token>
```

## Content Endpoints

### Get Content
Retrieve content collection with search and pagination.

```http
GET /api/content?query=search_term&page=1&limit=10
Authorization: Bearer <token>
```

### Create Content
Create new content item.

```http
POST /api/content
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Blog Post Title",
  "content": "Content body here...",
  "type": "text",
  "tags": ["marketing", "tips"]
}
```

## Law of Attraction Endpoints

### Analyze Form
Submit law of attraction form for AI analysis.

```http
POST /api/law-of-attraction
Authorization: Bearer <token>
Content-Type: application/json

{
  "goals": "I want to grow my business to $1M revenue",
  "current_situation": "Currently at $100K revenue",
  "desired_outcome": "Scale to 10x revenue within 2 years",
  "limiting_beliefs": "Maybe I'm not capable of running a big business",
  "affirmations": ["I am a successful entrepreneur"],
  "visualization_description": "I see myself leading a large team",
  "timeline": "2 years"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "analysis_uuid",
    "analysis": "Detailed AI analysis of the user's goals and mindset...",
    "recommendations": [
      "Focus on one revenue stream first",
      "Build systems for scalability"
    ],
    "affirmations": [
      "I am worthy of massive success",
      "I attract profitable opportunities"
    ],
    "action_steps": [
      "Create a 90-day growth plan",
      "Identify your highest-value activities"
    ],
    "score": 78,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Get Analysis History
Retrieve user's previous analyses.

```http
GET /api/law-of-attraction/history
Authorization: Bearer <token>
```

## File Upload Endpoints

### Upload Avatar
Upload user profile avatar.

```http
POST /api/upload/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <image_file>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.supabase.co/object/public/avatars/users/user_123.jpg",
    "path": "users/user_123.jpg",
    "size": 204800,
    "type": "image/jpeg"
  }
}
```

## Error Codes

| Status Code | Error Type | Description |
|-------------|------------|-------------|
| 400 | ValidationError | Request data validation failed |
| 401 | AuthenticationError | Authentication required |
| 403 | AuthorizationError | Insufficient permissions |
| 404 | NotFoundError | Resource not found |
| 409 | ConflictError | Resource conflict |
| 429 | RateLimitError | Rate limit exceeded |
| 500 | InternalServerError | Server error |
| 502 | ExternalServiceError | External service error |

## SDKs and Examples

### JavaScript/TypeScript
```javascript
const API_BASE = 'https://mkt4u.vercel.app/api';

// Authentication
const signIn = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Create campaign with auth
const createCampaign = async (campaignData, token) => {
  const response = await fetch(`${API_BASE}/campaigns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(campaignData)
  });
  return response.json();
};
```

### Python
```python
import requests

API_BASE = 'https://mkt4u.vercel.app/api'

# Authentication
def sign_in(email, password):
    response = requests.post(f'{API_BASE}/auth/signin', json={
        'email': email,
        'password': password
    })
    return response.json()

# Create campaign with auth
def create_campaign(campaign_data, token):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    response = requests.post(f'{API_BASE}/campaigns', 
                           json=campaign_data, headers=headers)
    return response.json()
```

### cURL
```bash
# Sign in
curl -X POST https://mkt4u.vercel.app/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Create campaign
curl -X POST https://mkt4u.vercel.app/api/campaigns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"New Campaign","description":"Campaign description"}'
```

## Webhooks

MKT4U supports webhooks for real-time notifications of important events.

### Setting Up Webhooks
Webhooks can be configured in your account settings. You'll need to provide:
- Endpoint URL (must be HTTPS)
- Secret key for signature verification
- Event types to subscribe to

### Webhook Events
- `campaign.created` - New campaign created
- `campaign.completed` - Campaign finished
- `content.published` - Content published
- `analysis.completed` - Law of attraction analysis completed

### Webhook Payload
```json
{
  "event": "campaign.completed",
  "timestamp": "2024-01-01T00:00:00Z",
  "data": {
    "campaign_id": "uuid",
    "user_id": "uuid",
    "metrics": {
      "total_views": 10000,
      "total_clicks": 500,
      "total_conversions": 25
    }
  }
}
```

## Support

For API support, please contact:
- Email: api-support@mkt4u.com
- Documentation: https://docs.mkt4u.com
- Status Page: https://status.mkt4u.com
