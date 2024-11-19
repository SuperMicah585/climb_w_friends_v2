using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NetTopologySuite.Geometries;

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
        public DbSet<Feature> Features { get; set; }
        public DbSet<Climb> Climbs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data
            modelBuilder.Entity<Climb>().HasData(
                new Climb
                {
                    ClimbId = 1,
                    ClimbName = "El Capitan",
                    Location = "Yosemite National Park",
                    Coordinates = new NetTopologySuite.Geometries.Point(-119.638, 37.733),
                    Url = "https://www.example.com/el-capitan",
                    ClimbType = "Trad,Big Wall",
                    Rating = "5.12d",
                    Pitches = 30,
                    Description = "One of the most iconic climbs in the world.",
                    CreatedAt = DateTime.UtcNow.ToString("o"),
                    UpdatedAt = DateTime.UtcNow.ToString("o")
                },
                new Climb
                {
                    ClimbId = 2,
                    ClimbName = "The Nose",
                    Location = "Yosemite National Park",
                    Coordinates = new NetTopologySuite.Geometries.Point(-119.638, 37.733),
                    Url = "https://www.example.com/the-nose",
                    ClimbType = "Trad,Big Wall",
                    Rating = "5.14a",
                    Pitches = 31,
                    Description = "A legendary climb with a rich history.",
                    CreatedAt = DateTime.UtcNow.ToString("o"),
                    UpdatedAt = DateTime.UtcNow.ToString("o")
                },
                new Climb
                {
                    ClimbId = 3,
                    ClimbName = "Moonlight Buttress",
                    Location = "Zion National Park",
                    Coordinates = new NetTopologySuite.Geometries.Point(-113.026, 37.274),
                    Url = "https://www.example.com/moonlight-buttress",
                    ClimbType = "Trad",
                    Rating = "5.12d",
                    Pitches = 9,
                    Description = "A stunning climb up a sandstone wall.",
                    CreatedAt = DateTime.UtcNow.ToString("o"),
                    UpdatedAt = DateTime.UtcNow.ToString("o")
                }
            );
        }
     }
}
