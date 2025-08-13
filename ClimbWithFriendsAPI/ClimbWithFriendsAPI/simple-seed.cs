using Microsoft.EntityFrameworkCore;
using ClimbWithFriendsAPI.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ClimbWithFriendsAPI
{
    public class SimpleSeed
    {
        public static async Task Main(string[] args)
        {
            Console.WriteLine("=== CLIMB WITH FRIENDS DATA SEEDING ===");
            Console.WriteLine($"Starting at: {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC");
            
            var host = CreateHostBuilder(args).Build();
            
            using (var scope = host.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                
                try
                {
                    Console.WriteLine("Connecting to database...");
                    
                    // Ensure database is created and migrations are applied
                    await context.Database.EnsureCreatedAsync();
                    Console.WriteLine("Database connection established successfully.");
                    
                    // Check if data already exists
                    var existingCount = await context.Set<Climb>().CountAsync();
                    Console.WriteLine($"Found {existingCount} existing climbs in database.");
                    
                    if (existingCount > 0)
                    {
                        Console.WriteLine("Database already contains data. Skipping seeding.");
                        Console.WriteLine("=== SEEDING COMPLETED ===");
                        return;
                    }
                    
                    Console.WriteLine("No climbs found. Starting data seeding...");
                    
                    string csvFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "Configurations", "climb_data.csv");
                    Console.WriteLine($"Looking for CSV file at: {csvFilePath}");
                    
                    if (File.Exists(csvFilePath))
                    {
                        Console.WriteLine("CSV file found. Beginning data seeding...");
                        var startTime = DateTime.UtcNow;
                        
                        await context.SeedClimbDataAsync(csvFilePath);
                        
                        var endTime = DateTime.UtcNow;
                        var duration = endTime - startTime;
                        
                        var finalCount = await context.Set<Climb>().CountAsync();
                        Console.WriteLine($"Data seeding completed successfully!");
                        Console.WriteLine($"Duration: {duration:mm\\:ss}");
                        Console.WriteLine($"Total climbs seeded: {finalCount}");
                    }
                    else
                    {
                        Console.WriteLine($"ERROR: CSV file not found at: {csvFilePath}");
                        Console.WriteLine("Please ensure the climb_data.csv file is in the correct location.");
                        Environment.Exit(1);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"ERROR during seeding: {ex.Message}");
                    Console.WriteLine($"Stack trace: {ex.StackTrace}");
                    
                    if (ex.InnerException != null)
                    {
                        Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                    }
                    
                    Environment.Exit(1);
                }
            }
            
            Console.WriteLine("=== SEEDING COMPLETED SUCCESSFULLY ===");
            Console.WriteLine($"Completed at: {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC");
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, config) =>
                {
                    config.SetBasePath(Directory.GetCurrentDirectory())
                          .AddJsonFile("appsettings.json", optional: false)
                          .AddJsonFile($"appsettings.{context.HostingEnvironment.EnvironmentName}.json", optional: true)
                          .AddEnvironmentVariables();
                })
                .ConfigureServices((context, services) =>
                {
                    services.AddDbContext<AppDbContext>(options =>
                        options.UseNpgsql(context.Configuration.GetConnectionString("databaseConnection")));
                });
    }
} 