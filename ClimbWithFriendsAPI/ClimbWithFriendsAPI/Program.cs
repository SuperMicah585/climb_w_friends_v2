using ClimbWithFriendsAPI.Data;
using NetTopologySuite.IO.Converters;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

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

// Database initialization and seeding
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        var context = services.GetRequiredService<AppDbContext>();

        // Ensure database is created
        context.Database.EnsureCreated();

        // Setup the CSV file path
        string csvFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "Configurations", "climb_data.csv");
        
        // Log the path we're trying to use
        logger.LogInformation($"Looking for CSV file at: {csvFilePath}");

        // Verify file exists
        if (!File.Exists(csvFilePath))
        {
            logger.LogError($"CSV file not found at: {csvFilePath}");
            throw new FileNotFoundException($"Required CSV file not found at: {csvFilePath}");
        }

        // Attempt to seed the data
        logger.LogInformation("Beginning data seeding...");
        await context.SeedClimbDataAsync(csvFilePath);
        logger.LogInformation("Data seeding completed successfully");
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while initializing the database");
        throw; // Rethrow to halt startup if database initialization fails
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();