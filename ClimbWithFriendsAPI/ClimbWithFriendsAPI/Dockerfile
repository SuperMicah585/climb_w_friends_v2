# Use the official .NET 8.0 runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Use the official .NET 8.0 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only the project file first to leverage Docker layer caching
COPY ["ClimbWithFriendsAPI.csproj", "./"]

# Restore dependencies
RUN dotnet restore "ClimbWithFriendsAPI.csproj" --no-cache

# Copy the CSV file separately to optimize layer caching
COPY ["Data/Configurations/climb_data.csv", "Data/Configurations/"]

# Copy the rest of the source code
COPY . .

# Build the application (skip restore since we already did it)
RUN dotnet build "ClimbWithFriendsAPI.csproj" -c Release -o /app/build --no-restore

# Publish the application
FROM build AS publish
RUN dotnet publish "ClimbWithFriendsAPI.csproj" -c Release -o /app/publish --no-restore --no-build

# Build the final runtime image
FROM base AS final
WORKDIR /app

# Copy only the published files
COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Start the application
ENTRYPOINT ["dotnet", "ClimbWithFriendsAPI.dll"] 