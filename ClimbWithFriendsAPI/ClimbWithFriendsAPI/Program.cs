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
        // Add converters for GeoJSON and Features
        options.SerializerSettings.Converters.Add(new FeatureConverter());
    });

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()  // Allows all origins
               .AllowAnyMethod()  // Allows any HTTP method (GET, POST, etc.)
               .AllowAnyHeader(); // Allows any HTTP header
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register AppDbContext with dependency injection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("databaseConnection")));

// Register ActivityLogService with dependency injection
builder.Services.AddScoped<ActivityLogService>();

var app = builder.Build();

// Use EnsureCreated() to create the database and schema
// DO NOT USE IN PRODUCTION
using (var scope = app.Services.CreateScope())
{
    var appDbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    appDbContext.Database.EnsureCreated(); // Ensures the database and tables are created
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS middleware
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
