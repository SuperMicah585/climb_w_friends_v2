
var builder = WebApplication.CreateBuilder(args);

// Configure port for Railway
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add basic services
builder.Services.AddControllers();

var app = builder.Build();

// Simple test endpoint
app.MapGet("/", () => "API is running!");
app.MapGet("/health", () => new { status = "healthy", timestamp = DateTime.UtcNow });

app.MapControllers();

Console.WriteLine($"Starting application on port {port}");
app.Run();

/*
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
    options.UseNpgsql(builder.Configuration.GetConnectionString("databaseConnection")));

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

        // Use migrations instead of EnsureCreated for production
        if (app.Environment.IsDevelopment())
        {
            context.Database.EnsureCreated();
        }
        else
        {
            // For production, ensure database exists but don't recreate
            context.Database.EnsureCreated();
        }

        // Only seed if no data exists
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
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while initializing the database");
        
        // In production, you might want to continue without seeding rather than crash
        if (app.Environment.IsDevelopment())
        {
            throw; // Rethrow in development
        }
        else
        {
            logger.LogError("Database initialization failed, but continuing startup...");
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

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();

*/