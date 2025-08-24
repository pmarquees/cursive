# Debug Blob Storage Issue

## Check These Things:

### 1. Browser Console Errors
Open DevTools (F12) and check for:
- Network errors on `/api/blob/list`
- Console warnings about "Blob storage failed"

### 2. Vercel Environment Variables
In your Vercel dashboard, check if you have:
- `BLOB_READ_WRITE_TOKEN` set correctly

### 3. Test Direct API
Try visiting this URL directly:
`https://your-app.vercel.app/api/blob/list`

Should return JSON with your files, not an error.

### 4. Force Refresh
Try a hard refresh (Ctrl+Shift+R) to clear any cached localStorage.

## What's Happening:
- AI tools (server) ✅ correctly see Blob files
- UI (client) ❌ falls back to localStorage when Blob API fails
- This creates the disconnect you're seeing

## Expected Behavior:
Both should show the same files from Blob storage.