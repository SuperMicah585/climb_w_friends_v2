using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NetTopologySuite.Geometries;
using YourProjectNamespace.Data.Configurations;

namespace ClimbWithFriendsAPI.Data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            options.UseNpgsql(Configuration.GetConnectionString("databaseConnection"),
                o => o.UseNetTopologySuite());
        }

        public DbSet<Map> Maps { get; set; }
        public DbSet<MapToUser> MapToUsers { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Climb> Climbs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MapConfiguration());
            modelBuilder.ApplyConfiguration(new MapToUserConfiguration());
            modelBuilder.ApplyConfiguration(new ClimbConfiguration());
            base.OnModelCreating(modelBuilder);
        }
     }
}
