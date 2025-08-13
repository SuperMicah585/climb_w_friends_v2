using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NetTopologySuite.Geometries;
using YourProjectNamespace.Data.Configurations;
using Microsoft.EntityFrameworkCore.Diagnostics;



namespace ClimbWithFriendsAPI.Data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    // Connect to PostgreSQL with connection string from app settings
    optionsBuilder.UseNpgsql(Configuration.GetConnectionString("databaseConnection"), 
        o => o.UseNetTopologySuite());
}

        public DbSet<Map> Maps { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        public DbSet<MapToUser> MapToUsers { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Climb> Climbs { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<MapToTag> MapToTags { get; set; }
        public DbSet<ClimbToTag> ClimbToTags { get; set; }
        public DbSet<MapToFeatureToClimb> MapToFeatureToClimbs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<MapToUserToClimb> MapToUserToClimbs { get; set; }
        public DbSet<Tick> Ticks { get; set; }
        public DbSet<Attempt> Attempts { get; set; }
        public DbSet<ClimbChat> ClimbChats{get;set;}
        public DbSet<UserFilter> UserFilters{get;set;}
        public DbSet<TagFilter> TagFilters{get;set;}
        public DbSet<GradeRangeFilter> GradeRangeFilters{get;set;}
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Apply all existing configurations
    modelBuilder.ApplyConfiguration(new ClimbConfiguration());


    // Apply PostGIS support
    modelBuilder.HasPostgresExtension("postgis"); // Ensure PostGIS is available

    // Configure the GeoFeature property to use PostGIS Geometry type


    base.OnModelCreating(modelBuilder);
}
     }

     public static class DbContextExtensions
{
    public static async Task SeedClimbDataAsync(this DbContext context, string csvFilePath)
    {
        var configuration = new ClimbConfiguration();
        await configuration.SeedDataAsync(context, csvFilePath);
    }
}
}