# Image Upload Feature Setup - COMPLETED ✅

This document explains how to set up the image upload feature for maps in the ClimbWithFriends application.

## Status: FULLY INTEGRATED ✅

The image upload feature has been successfully integrated with your existing Supabase project and database.

## Backend Setup

### 1. Supabase Configuration ✅ COMPLETED

Supabase has been configured with your existing project credentials:

- **Project URL**: `https://wdxzsztlsrzolxadaisl.supabase.co`
- **Service Key**: Configured in both `appsettings.json` and `appsettings.Development.json`
- **Storage Bucket**: `climb_w_friends_2` (your existing bucket)

### 2. Supabase Storage Bucket ✅ COMPLETED

Using your existing storage bucket `climb_w_friends_2` at:
https://supabase.com/dashboard/project/wdxzsztlsrzolxadaisl/storage/buckets/climb_w_friends_2

The bucket is configured and ready for image uploads.

### 3. Database Migration ✅ COMPLETED

The `ImageUrl` column has been successfully added to the `Maps` table in your database.

**Column Details:**
- **Table**: `Maps`
- **Column**: `ImageUrl`
- **Type**: `text` (nullable)
- **Status**: ✅ Added successfully

## Frontend Setup

### 1. Environment Variables

Make sure your `.env` file includes:

```
VITE_DOMAIN=http://localhost:8080/
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Components Added

- `src/services/storageService.ts` - Handles image upload to backend
- `src/hooks/useImageUpload.ts` - Custom hook for image upload with validation
- `src/reusableComponents/imageUpload.tsx` - Reusable image upload component
- Updated `addMapModal.tsx` - Now includes image upload functionality

## Usage

### Creating a Map with Image

1. Click "Add Map" in the dashboard
2. Fill in the title and description
3. Optionally upload an image by dragging and dropping or clicking to select
4. The image will be uploaded to Supabase and the URL stored with the map

### Image Validation

- Supported formats: JPG, PNG, GIF, WebP
- Maximum file size: 10MB
- Images are stored in the `climb_w_friends_2` bucket under the `maps/` folder

## API Endpoints

- `POST /api/Maps/upload-image` - Uploads an image and returns the public URL
- `POST /api/Maps/` - Creates a map (now accepts `imageUrl` field)

## File Structure

```
src/
├── services/
│   └── storageService.ts          # Image upload service
├── hooks/
│   └── useImageUpload.ts          # Image upload hook
├── reusableComponents/
│   └── imageUpload.tsx            # Image upload component
└── pages/dashboardComponents/mapsComponents/
    └── addMapModal.tsx            # Updated with image upload
```

## Troubleshooting

1. **Build errors**: Make sure the Supabase package is installed in the backend
2. **Upload failures**: Check Supabase configuration and bucket permissions
3. **Image not displaying**: Verify the bucket is public and RLS policies allow access 