# API Setup Guide

## Prerequisites
- .NET SDK 8.0
- PostgreSQL v16.0
- postgis

## Steps
1. Restore Dependencies:
   ```bash
   dotnet restore
2. Setup Database:
   ```bash
   dotnet ef database update
3. Run program (Swagger should launch automatically)
   ```bash   
   dotnet run



## Database Commands (using package manager console)

```bash   
   Add-Migration insermigrationname
```bash   
   Update-Database 