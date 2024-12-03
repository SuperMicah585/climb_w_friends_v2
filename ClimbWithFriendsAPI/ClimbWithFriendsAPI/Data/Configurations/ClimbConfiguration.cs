using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetTopologySuite.Geometries;

namespace YourProjectNamespace.Data.Configurations
{
    public class ClimbConfiguration : IEntityTypeConfiguration<Climb>
    {
        public void Configure(EntityTypeBuilder<Climb> builder)
        {
            builder.HasKey(c => c.ClimbId);

            builder.Property(c => c.ClimbName).IsRequired().HasMaxLength(100);
            builder.Property(c => c.Location).IsRequired().HasMaxLength(200);
            builder.Property(c => c.Coordinates).IsRequired();
            builder.Property(c => c.Url).HasMaxLength(500);
            builder.Property(c => c.ClimbType).HasMaxLength(100);
            builder.Property(c => c.Rating).HasMaxLength(50);
            builder.Property(c => c.Pitches).IsRequired();
            builder.Property(c => c.Description).HasMaxLength(1000);

            // Seed Data
            builder.HasData(
                new Climb
                {
                    ClimbId = 1,
                    ClimbName = "El Capitan",
                    Location = "Yosemite National Park",
                    Coordinates = new Point(-119.638, 37.733) { SRID = 4326 },
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
                    Coordinates = new Point(-119.638, 37.733) { SRID = 4326 },
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
                    Coordinates = new Point(-113.026, 37.274) { SRID = 4326 },
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
