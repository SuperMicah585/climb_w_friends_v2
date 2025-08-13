# Use the official .NET 8.0 SDK as the base image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["ClimbWithFriendsAPI.csproj", "./"]
RUN dotnet restore "ClimbWithFriendsAPI.csproj"

# Copy the rest of the source code
COPY . .

# Build the application in Release mode
RUN dotnet build "ClimbWithFriendsAPI.csproj" -c Release -o /app/build

# Publish the application
RUN dotnet publish "ClimbWithFriendsAPI.csproj" -c Release -o /app/publish

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

# Set the working directory
WORKDIR /app

# Copy the published application from the build stage
COPY --from=build /app/publish .

# Expose port 8080 (Railway will override this with PORT env var)
EXPOSE 8080

# Set the entry point
ENTRYPOINT ["dotnet", "ClimbWithFriendsAPI.dll"] 