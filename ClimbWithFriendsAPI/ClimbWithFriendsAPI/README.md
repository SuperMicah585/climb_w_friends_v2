# API Setup Guide

## Prerequisites

- [.Net SDK 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [PostgreSQL v16](https://www.postgresql.org/download/)
- [PostGIS](https://postgis.net/documentation/getting_started/)

## Steps

1. Restore Dependencies:
   ```bash
   dotnet restore
   ```
2. Setup Database:
   ```bash
   dotnet ef database update
   ```
3. Run program (Swagger should launch automatically)
   ```bash
   dotnet run
   ```

## Database Commands (using package manager console)

```bash
   Add-Migration insermigrationname

   Update-Database
```
