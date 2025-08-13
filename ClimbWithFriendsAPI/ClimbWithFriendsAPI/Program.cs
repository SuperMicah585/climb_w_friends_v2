using ClimbWithFriendsAPI.Data;
using NetTopologySuite.IO.Converters;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;



var builder = WebApplication.CreateBuilder(args);

// Configure port for Railway
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services to the container.
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.Converters.Add(new FeatureConverter());
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        options.SerializerSettings.Converters.Add(new FeatureConverter());
    });

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register AppDbContext with dependency injection
builder.Services.AddDbContext<AppDbContext>(options =>
{
    try
    {
        // Get connection string from environment variable (Railway) or configuration (local)
        var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") ?? 
                              builder.Configuration.GetConnectionString("databaseConnection");
        
        // If no connection string is found, use a default for development
        if (string.IsNullOrEmpty(connectionString))
        {
            connectionString = "Host=localhost; Port=5432; Database=ClimbWithFriendsDB; Username=postgres; Password=climb";
        }
        
        // If using Railway's DATABASE_URL, convert it to Npgsql format
        if (connectionString?.StartsWith("postgres://") == true)
        {
            try
            {
                var uri = new Uri(connectionString);
                var username = uri.UserInfo.Split(':')[0];
                var password = uri.UserInfo.Split(':')[1];
                var host = uri.Host;
                var port = uri.Port;
                var database = uri.AbsolutePath.TrimStart('/');
                
                connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode=Require;Trust Server Certificate=true;";
            }
            catch (Exception uriEx)
            {
                // If URI parsing fails, log and use original connection string
                Console.WriteLine($"Failed to parse DATABASE_URL: {uriEx.Message}");
            }
        }
        
        options.UseNpgsql(connectionString, npgsqlOptions =>
        {
            npgsqlOptions.EnableRetryOnFailure(
                maxRetryCount: 3,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorCodesToAdd: null);
        });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error configuring database: {ex.Message}");
        // Use a minimal connection string as fallback
        options.UseNpgsql("Host=localhost;Port=5432;Database=ClimbWithFriendsDB;Username=postgres;Password=climb");
    }
});

builder.Services.AddScoped<ActivityLogService>();

var app = builder.Build();

// Database initialization and seeding (only run if needed)
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        
        // Log connection info
        logger.LogInformation("Attempting to connect to database...");
        if (Environment.GetEnvironmentVariable("DATABASE_URL") != null)
        {
            logger.LogInformation("Using DATABASE_URL from environment variables");
        }
        else
        {
            logger.LogInformation("Using connection string from configuration");
        }

        // Test database connection first
        try
        {
            logger.LogInformation("Testing database connection...");
            var canConnect = context.Database.CanConnect();
            logger.LogInformation($"Database connection test result: {canConnect}");
        }
        catch (Exception connectionEx)
        {
            logger.LogError(connectionEx, "Database connection test failed");
            // Continue anyway - the app should start even if database is not available
        }

        // Use migrations for production, EnsureCreated for development
        if (app.Environment.IsDevelopment())
        {
            try
            {
                context.Database.EnsureCreated();
                logger.LogInformation("Database EnsureCreated completed");
            }
            catch (Exception ensureEx)
            {
                logger.LogWarning(ensureEx, "EnsureCreated failed, continuing without database initialization");
            }
        }
        else
        {
            // For production, apply migrations instead of EnsureCreated
            try
            {
                context.Database.Migrate();
                logger.LogInformation("Database migrations completed");
            }
            catch (Exception migrationEx)
            {
                logger.LogWarning(migrationEx, "Migration failed, trying EnsureCreated as fallback");
                try
                {
                    context.Database.EnsureCreated();
                    logger.LogInformation("EnsureCreated fallback completed");
                }
                catch (Exception ensureEx)
                {
                    logger.LogWarning(ensureEx, "EnsureCreated fallback also failed, continuing without database initialization");
                }
            }
        }

        // Only seed if no data exists
        try
        {
            if (!context.Set<Climb>().Any()) // Check if any climbs exist
            {
                // Setup the CSV file path
                string csvFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "Configurations", "climb_data.csv");
                
                // Log the path we're trying to use
                logger.LogInformation($"Looking for CSV file at: {csvFilePath}");

                // Verify file exists before trying to seed
                if (File.Exists(csvFilePath))
                {
                    logger.LogInformation("Beginning data seeding...");
                    await context.SeedClimbDataAsync(csvFilePath);
                    logger.LogInformation("Data seeding completed successfully");
                }
                else
                {
                    logger.LogWarning($"CSV file not found at: {csvFilePath}. Skipping data seeding.");
                    // Don't throw - let app start without seeding if file is missing
                }
            }
            else
            {
                logger.LogInformation("Database already contains data. Skipping seeding.");
            }
        }
        catch (Exception seedEx)
        {
            logger.LogWarning(seedEx, "Data seeding failed, continuing without seeding");
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while initializing the database");
        
        // In production, log the error but don't crash the app
        if (app.Environment.IsDevelopment())
        {
            throw; // Rethrow in development
        }
        else
        {
            logger.LogError("Database initialization failed, but continuing startup...");
            // Don't throw - let the app start even if database initialization fails
        }
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Remove HTTPS redirect for Railway (they handle SSL termination)
// app.UseHttpsRedirection();

// Add global exception handler
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync("{\"error\":\"An error occurred processing your request.\"}");
    });
});

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();