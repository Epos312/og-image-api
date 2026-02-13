# OG Image API Documentation

## Overview
Generate beautiful Open Graph images for social media previews with a simple REST API.

## Base URL
```
Production: https://your-domain.com
Development: http://localhost:3000
```

## Authentication
All API requests require an API key passed in the header:
```
X-API-Key: your_api_key_here
```

## Endpoints

### 1. Generate OG Image (POST)
**Endpoint:** `POST /api/generate`

**Headers:**
```
Content-Type: application/json
X-API-Key: your_api_key
```

**Request Body:**
```json
{
  "title": "Your Title Here",
  "subtitle": "Optional subtitle",
  "theme": "gradient",
  "width": 1200,
  "height": 630
}
```

**Parameters:**
- `title` (required, string): Main text to display
- `subtitle` (optional, string): Secondary text below title
- `theme` (optional, string): Theme name - `gradient`, `dark`, `light`, `tech`
- `width` (optional, number): Image width in pixels (default: 1200)
- `height` (optional, number): Image height in pixels (default: 630)

**Response:**
Returns PNG image binary data

**Example (JavaScript):**
```javascript
const response = await fetch('https://your-domain.com/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your_api_key'
  },
  body: JSON.stringify({
    title: 'My Awesome Blog Post',
    subtitle: 'Learn how to...',
    theme: 'gradient'
  })
});

const blob = await response.blob();
const imageUrl = URL.createObjectURL(blob);
```

**Example (cURL):**
```bash
curl -X POST https://your-domain.com/api/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_api_key" \
  -d '{
    "title": "Hello World",
    "theme": "gradient"
  }' \
  --output og-image.png
```

### 2. Generate OG Image (GET)
**Endpoint:** `GET /api/generate`

Perfect for direct browser use or HTML img tags.

**Query Parameters:**
- `title` (required)
- `subtitle` (optional)
- `theme` (optional)
- `width` (optional)
- `height` (optional)

**Example:**
```html
<img src="https://your-domain.com/api/generate?title=Hello%20World&theme=gradient&X-API-Key=your_key">
```

**Direct URL:**
```
https://your-domain.com/api/generate?title=My%20Title&subtitle=My%20Subtitle&theme=tech
```

### 3. Health Check
**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

## Themes

### Available Themes:
1. **gradient** - Purple gradient background (default)
2. **dark** - Dark mode with white text
3. **light** - Light background with dark text
4. **tech** - Blue tech gradient

## Rate Limits

### Free Tier
- 100 requests per hour
- 1,000 images per month

### Pro Tier ($29/month)
- 1,000 requests per hour
- 10,000 images per month

### Enterprise Tier ($99/month)
- Unlimited requests
- 100,000 images per month
- Custom rate limits available

## Error Responses

### 401 Unauthorized
```json
{
  "error": "API key required"
}
```

### 403 Forbidden
```json
{
  "error": "Invalid API key"
}
```

### 429 Too Many Requests
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 3600
}
```

### 400 Bad Request
```json
{
  "error": "Title is required"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to generate image"
}
```

## Integration Examples

### Next.js (App Router)
```javascript
// app/api/og/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  
  const response = await fetch('https://your-domain.com/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.OG_IMAGE_API_KEY
    },
    body: JSON.stringify({ title, theme: 'gradient' })
  });
  
  const blob = await response.blob();
  return new Response(blob, {
    headers: { 'Content-Type': 'image/png' }
  });
}
```

### WordPress
```php
<?php
function get_og_image($post_title) {
    $api_key = get_option('og_image_api_key');
    
    $response = wp_remote_post('https://your-domain.com/api/generate', [
        'headers' => [
            'Content-Type' => 'application/json',
            'X-API-Key' => $api_key
        ],
        'body' => json_encode([
            'title' => $post_title,
            'theme' => 'gradient'
        ])
    ]);
    
    return wp_remote_retrieve_body($response);
}
?>
```

### Python
```python
import requests

def generate_og_image(title, subtitle="", theme="gradient"):
    url = "https://your-domain.com/api/generate"
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": "your_api_key"
    }
    data = {
        "title": title,
        "subtitle": subtitle,
        "theme": theme
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        with open("og-image.png", "wb") as f:
            f.write(response.content)
        return True
    return False
```

## Best Practices

1. **Cache Images**: Generated images rarely change, so cache them
2. **Error Handling**: Always handle API errors gracefully
3. **Title Length**: Keep titles under 60 characters for best results
4. **Use HTTPS**: Always use secure connections in production
5. **Monitor Usage**: Check your dashboard to avoid hitting rate limits

## Support

- Email: support@your-domain.com
- Documentation: https://your-domain.com/docs
- Status Page: https://status.your-domain.com

## Changelog

### v1.0.0 (2026-02-12)
- Initial release
- 4 themes available
- REST API with GET/POST support
- Rate limiting
- Stripe integration for subscriptions
