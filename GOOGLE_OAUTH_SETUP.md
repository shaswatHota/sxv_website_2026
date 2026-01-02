# Google OAuth Setup Guide

## Prerequisites
1. A Google Cloud Console project
2. Google OAuth 2.0 credentials

## Setup Steps

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google Identity API

### 2. Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: Your app name
   - User support email: Your email
   - Developer contact information: Your email

### 3. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production domain
5. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - Your production domain

### 4. Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Add your Google OAuth credentials:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_actual_client_id_here
   GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
   ```

### 5. Backend Integration
Make sure your backend API supports these endpoints:
- `POST /auth/google` - For Google Sign-In
- `POST /auth/google/signup` - For Google Sign-Up

The backend should verify the Google JWT token and create/authenticate users accordingly.

## Security Notes
- Never expose your `GOOGLE_CLIENT_SECRET` in client-side code
- Always verify Google JWT tokens on your backend
- Use HTTPS in production
- Regularly rotate your OAuth credentials

## Testing
1. Start your development server: `npm run dev`
2. Navigate to the login/signup pages
3. Click "Continue with Google"
4. Complete the Google OAuth flow

## Troubleshooting
- Ensure your domain is added to authorized origins
- Check that the Google Identity Services script loads correctly
- Verify your client ID is correct and not expired
- Make sure your backend can handle Google OAuth tokens