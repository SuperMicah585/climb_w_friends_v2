using ClimbWithFriendsAPI.Data;
using NetTopologySuite.IO.Converters;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

// Add very early logging to catch startup issues
Console.WriteLine("=== APPLICATION STARTING ===");
Console.WriteLine($"Environment: {Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Not set"}");
Console.WriteLine($"Current Directory: {Directory.GetCurrentDirectory()}");
Console.WriteLine($"Runtime Version: {Environment.Version}");
Console.WriteLine($"OS Version: {Environment.OSVersion}");

// Check for .NET 8 compatibility
var runtimeVersion = Environment.Version;
if (runtimeVersion.Major == 8 && runtimeVersion.Minor == 0 && runtimeVersion.Build == 0)
{
    Console.WriteLine("WARNING: Running on .NET 8.0.0 - some features may not be available");
}

try
{

    Console.WriteLine("=== CREATING WEB APPLICATION BUILDER ===");
    var builder = WebApplication.CreateBuilder(args);

    Console.WriteLine("=== CONFIGURING PORT ===");
    // Configure port for Railway
    var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
    Console.WriteLine($"Using port: {port}");
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

    Console.WriteLine("=== ADDING SERVICES ===");
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

    Console.WriteLine("=== CONFIGURING DATABASE ===");
    // Register AppDbContext with dependency injection
builder.Services.AddDbContext<AppDbContext>(options =>
{
    try
    {
        // Get connection string from environment variable (Railway) or configuration (local)
        var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") ?? 
                              builder.Configuration.GetConnectionString("databaseConnection");
        
        Console.WriteLine($"Raw DATABASE_URL: {Environment.GetEnvironmentVariable("DATABASE_URL")}");
        Console.WriteLine($"Raw connection string from config: {builder.Configuration.GetConnectionString("databaseConnection")}");
        
        // If no connection string is found, use a default for development
        if (string.IsNullOrEmpty(connectionString))
        {
            connectionString = "Host=localhost; Port=5432; Database=ClimbWithFriendsDB; Username=postgres; Password=climb";
            Console.WriteLine("Using default connection string");
        }
        
        // If using Railway's DATABASE_URL, convert it to Npgsql format
        if (connectionString?.StartsWith("postgres://") == true)
        {
            try
            {
                Console.WriteLine("Converting Railway DATABASE_URL format...");
                var uri = new Uri(connectionString);
                var username = uri.UserInfo.Split(':')[0];
                var password = uri.UserInfo.Split(':')[1];
                var host = uri.Host;
                var port = uri.Port;
                var database = uri.AbsolutePath.TrimStart('/');
                
                connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode=Require;Trust Server Certificate=true;";
                Console.WriteLine($"Converted connection string: Host={host};Port={port};Database={database};Username={username};Password=***;SSL Mode=Require;Trust Server Certificate=true;");
            }
            catch (Exception uriEx)
            {
                // If URI parsing fails, log and use original connection string
                Console.WriteLine($"Failed to parse DATABASE_URL: {uriEx.Message}");
                Console.WriteLine($"Using original connection string: {connectionString}");
            }
        }
        else
        {
            Console.WriteLine($"Using connection string as-is: {connectionString}");
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

    Console.WriteLine("=== BUILDING APPLICATION ===");
    var app = builder.Build();

// Database initialization and seeding (run in background to avoid blocking startup)
_ = Task.Run(async () =>
{
    await Task.Delay(5000); // Wait 5 seconds for app to fully start
    
    using var scope = app.Services.CreateScope();
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

        // Always try migrations first, then fallback to EnsureCreated
        bool databaseInitialized = false;
        
        // Try migrations first (preferred for production)
        try
        {
            logger.LogInformation("Attempting to run database migrations...");
            context.Database.Migrate();
            logger.LogInformation("Database migrations completed successfully");
            databaseInitialized = true;
        }
        catch (Exception migrationEx)
        {
            logger.LogWarning(migrationEx, "Migration failed, trying EnsureCreated as fallback");
            
            // Fallback to EnsureCreated
            try
            {
                logger.LogInformation("Attempting to ensure database is created...");
                context.Database.EnsureCreated();
                logger.LogInformation("Database EnsureCreated completed successfully");
                databaseInitialized = true;
            }
            catch (Exception ensureEx)
            {
                logger.LogWarning(ensureEx, "EnsureCreated also failed, continuing without database initialization");
            }
        }
        
        if (!databaseInitialized)
        {
            logger.LogWarning("Database initialization failed - tables may not exist");
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
});

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
    
    // Add health check endpoint for Railway
    app.MapGet("/health", () => "OK");
    app.MapGet("/", () => "ClimbWithFriends API is running!");

    Console.WriteLine("=== STARTING APPLICATION ===");
    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine($"=== CRITICAL STARTUP ERROR ===");
    Console.WriteLine($"Error Type: {ex.GetType().Name}");
    Console.WriteLine($"Error Message: {ex.Message}");
    Console.WriteLine($"Stack Trace: {ex.StackTrace}");
    
    // Log inner exception if it exists
    if (ex.InnerException != null)
    {
        Console.WriteLine($"Inner Exception Type: {ex.InnerException.GetType().Name}");
        Console.WriteLine($"Inner Exception Message: {ex.InnerException.Message}");
        Console.WriteLine($"Inner Exception Stack Trace: {ex.InnerException.StackTrace}");
    }
    
    // Re-throw to ensure the process exits with error code
    throw;
}