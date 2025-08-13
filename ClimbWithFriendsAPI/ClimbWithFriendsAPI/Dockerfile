# Use the official .NET 8.0 runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory
WORKDIR /app

# Copy the project file
COPY ["ClimbWithFriendsAPI.csproj", "./"]

# Restore dependencies
RUN dotnet restore "ClimbWithFriendsAPI.csproj"

# Copy the rest of the source code
COPY . .

# Build and publish in one step
RUN dotnet publish "ClimbWithFriendsAPI.csproj" -c Release -o /app/publish

# Set the working directory to the published app
WORKDIR /app/publish

# Expose port 8080
EXPOSE 8080

# Set the entry point
ENTRYPOINT ["dotnet", "ClimbWithFriendsAPI.dll"] 