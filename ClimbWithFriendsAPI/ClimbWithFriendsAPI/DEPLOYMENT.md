# ClimbWithFriends API Deployment Guide

## Option 2: Fast Deployment + Separate Data Seeding

This deployment strategy separates the app deployment from data seeding for faster initial deployment.

### Step 1: Deploy the Application

1. **Push your code to Railway**
   - The app will deploy without seeding data
   - Expected deployment time: 2-5 minutes
   - The app will be available immediately but without climb data

2. **Set up environment variables in Railway:**
   ```
   ASPNETCORE_ENVIRONMENT=Production
   ConnectionStrings__databaseConnection=your_railway_postgres_connection_string
   ```

### Step 2: Seed the Data

After successful deployment, seed the data using one of these methods:

#### Method A: Using Railway CLI (Recommended)
```bash
# Connect to your Railway service
railway shell

# Navigate to the app directory
cd /app

# Run the seeding script
./seed-data.sh
```

#### Method B: Using Railway Dashboard
1. Go to your Railway project dashboard
2. Navigate to your service
3. Open the terminal/console
4. Run: `./seed-data.sh`

#### Method C: Direct dotnet command
```bash
# In Railway shell or terminal
dotnet run --project ClimbWithFriendsAPI.csproj SeedData.cs
```

### Expected Seeding Time
- **Duration:** 8-12 minutes
- **Records:** 137,060 climbs
- **Progress:** The script will show real-time progress

### Verification

After seeding, verify the data:
1. Check your API endpoints
2. The `/health` endpoint should return "OK"
3. Climb-related endpoints should return data

### Troubleshooting

#### If seeding fails:
1. Check database connection string
2. Ensure CSV file is present: `Data/Configurations/climb_data.csv`
3. Check Railway logs for errors
4. Verify database permissions

#### If you need to re-seed:
1. Clear the database or drop the Climbs table
2. Run the seeding script again

### Files Included

- `SeedData.cs` - Standalone seeding application
- `seed-data.sh` - Shell script for easy seeding
- `DEPLOYMENT.md` - This deployment guide

### Benefits of This Approach

1. **Faster initial deployment** (2-5 minutes vs 30+ minutes)
2. **App available immediately** for other operations
3. **Separate monitoring** of seeding progress
4. **Easy to re-seed** if needed
5. **Better error handling** and visibility

### Switching Back to Option 1

If you want to enable seeding during startup:

1. Edit `Program.cs`
2. Uncomment the seeding block
3. Remove the "Data seeding disabled" message
4. Redeploy

The seeding will then happen automatically on first startup. 