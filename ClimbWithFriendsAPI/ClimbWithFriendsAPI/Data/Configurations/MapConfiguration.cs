using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class MapConfiguration : IEntityTypeConfiguration<Map>
{
    public void Configure(EntityTypeBuilder<Map> builder)
    {
        builder.HasKey(m => m.MapId);

        builder.Property(m => m.MapName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(m => m.Description)
            .HasMaxLength(500);



        // Seed data
        builder.HasData(
            new Map
            {
                MapId = 101,
                MapName = "Summit Challenge A",
                Description = "A curated collection of intermediate summit climbs offering breathtaking views.",
                CreatedAt = "2024-11-01T09:00:00Z",
                UpdatedAt = "2024-11-10T09:00:00Z"
            },
            new Map
            {
                MapId = 102,
                MapName = "Alpine Adventure B",
                Description = "An alpine-themed collection featuring climbs through rugged peaks and icy paths.",
                CreatedAt = "2024-11-02T10:00:00Z",
                UpdatedAt = "2024-11-11T10:00:00Z"
            },
            new Map
            {
                MapId = 103,
                MapName = "Canyon Climbs C",
                Description = "A selection of climbs showcasing stunning canyon walls and deep gorges.",
                CreatedAt = "2024-11-03T11:00:00Z",
                UpdatedAt = "2024-11-12T11:00:00Z"
            },
            new Map
            {
                MapId = 104,
                MapName = "Desert Heights D",
                Description = "Climbs in arid desert landscapes, including iconic sandstone formations.",
                CreatedAt = "2024-11-04T12:00:00Z",
                UpdatedAt = "2024-11-13T12:00:00Z"
            },
            new Map
            {
                MapId = 105,
                MapName = "Winter Ascents E",
                Description = "A collection of snow-covered climbs, ideal for experienced adventurers.",
                CreatedAt = "2024-11-05T13:00:00Z",
                UpdatedAt = "2024-11-14T13:00:00Z"
            }
        );
    }
}
