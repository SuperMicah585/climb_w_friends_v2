# Railway Deployment Guide

## Prerequisites
- Railway account
- PostgreSQL database (Railway provides this)
- Environment variables configured

## Deployment Steps

### 1. Connect Your Repository
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### 2. Configure Environment Variables
Set these environment variables in Railway:

```
DATABASE_URL=postgresql://username:password@host:port/database
PORT=8080
ASPNETCORE_ENVIRONMENT=Production
```

**Note**: Railway will automatically provide the `DATABASE_URL` if you add a PostgreSQL database to your project.

### 3. Deploy
Railway will automatically detect the Dockerfile and build your application.

## Environment Variables Explained

- **DATABASE_URL**: Railway's PostgreSQL connection string (auto-provided)
- **PORT**: Railway sets this automatically, but we default to 8080
- **ASPNETCORE_ENVIRONMENT**: Set to "Production" for production settings

## Troubleshooting

### Build Issues
- Ensure Dockerfile is in the correct location (`ClimbWithFriendsAPI/ClimbWithFriendsAPI/Dockerfile`)
- Check that all files are committed to your repository

### Runtime Issues
- Check Railway logs for detailed error messages
- Verify environment variables are set correctly
- Ensure database connection is working

### Common Issues
1. **Port Issues**: Railway automatically handles port mapping
2. **Database Connection**: Use Railway's PostgreSQL service
3. **Environment Variables**: Make sure all required variables are set

## Local Testing (Optional)
If you have Docker installed locally:

```bash
# Build the image
docker build -t climbwithfriends-api .

# Run the container
docker run -p 8080:8080 -e DATABASE_URL="your_connection_string" climbwithfriends-api
```

## Support
- Check Railway's documentation: https://docs.railway.app/
- Review application logs in Railway dashboard
- Ensure all environment variables are properly configured 