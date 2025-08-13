#!/bin/bash

echo "=== CLIMB WITH FRIENDS DATA SEEDING SCRIPT ==="
echo "Starting at: $(date)"
echo ""

# Set environment to production if not set
export ASPNETCORE_ENVIRONMENT=${ASPNETCORE_ENVIRONMENT:-Production}
echo "Using environment: $ASPNETCORE_ENVIRONMENT"

# Check if we're in the right directory
if [ ! -f "ClimbWithFriendsAPI.csproj" ]; then
    echo "ERROR: ClimbWithFriendsAPI.csproj not found in current directory"
    echo "Please run this script from the ClimbWithFriendsAPI directory"
    exit 1
fi

# Check if CSV file exists
if [ ! -f "Data/Configurations/climb_data.csv" ]; then
    echo "ERROR: climb_data.csv not found at Data/Configurations/climb_data.csv"
    echo "Please ensure the CSV file is in the correct location"
    exit 1
fi

echo "CSV file found. Starting seeding process..."
echo ""

# Run the seeding
dotnet run --project ClimbWithFriendsAPI.csproj SeedData.cs

# Check exit code
if [ $? -eq 0 ]; then
    echo ""
    echo "=== SEEDING COMPLETED SUCCESSFULLY ==="
    echo "Completed at: $(date)"
else
    echo ""
    echo "=== SEEDING FAILED ==="
    echo "Failed at: $(date)"
    exit 1
fi 