using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class MapToUserConfiguration : IEntityTypeConfiguration<MapToUser>
    {
        public void Configure(EntityTypeBuilder<MapToUser> builder)
        {
            builder.HasKey(mu => mu.Id);

            builder.Property(mu => mu.MapId).IsRequired();
            builder.Property(mu => mu.UserId).IsRequired();
            builder.Property(mu => mu.AssociatedAt).IsRequired();

            // Define relationship
            builder.HasOne(mu => mu.Map)
                   .WithMany() // Assuming no back-reference in Map
                   .HasForeignKey(mu => mu.MapId);

            // Seed Data
            builder.HasData(
                new MapToUser { Id = 1, MapId = 101, UserId = 201, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToUser { Id = 2, MapId = 102, UserId = 201, AssociatedAt = "2024-12-02T11:00:00Z" },
                new MapToUser { Id = 3, MapId = 103, UserId = 201, AssociatedAt = "2024-12-03T12:00:00Z" },
                new MapToUser { Id = 4, MapId = 104, UserId = 202, AssociatedAt = "2024-12-02T12:00:00Z" },
                new MapToUser { Id = 5, MapId = 101, UserId = 203, AssociatedAt = "2024-12-03T14:00:00Z" },
                new MapToUser { Id = 6, MapId = 105, UserId = 203, AssociatedAt = "2024-12-04T15:00:00Z" }
            );
        }
    }
}
