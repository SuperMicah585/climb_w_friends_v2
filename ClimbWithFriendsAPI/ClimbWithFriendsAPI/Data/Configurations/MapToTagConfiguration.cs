using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class MapToTagConfiguration : IEntityTypeConfiguration<MapToTag>
    {
        public void Configure(EntityTypeBuilder<MapToTag> builder)
        {
            builder.HasKey(mt => mt.Id);

            builder.Property(mt => mt.MapId).IsRequired();
            builder.Property(mt => mt.TagId).IsRequired();
            builder.Property(mt => mt.AssociatedAt).IsRequired();

            builder.HasOne(mt => mt.Tag)
               .WithMany(t => t.MapToTags)
               .HasForeignKey(mt => mt.TagId)
               .OnDelete(DeleteBehavior.Cascade);

            // Define relationship with cascade delete
            builder.HasOne(mt => mt.Map)
                   .WithMany() // Assuming no back-reference in Map
                   .HasForeignKey(mt => mt.MapId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete

            builder.ToTable("MapToTags");

            // Seed Data
            builder.HasData(
                new MapToTag { Id = 1, MapId = 101, TagId = 101, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTag { Id = 2, MapId = 101, TagId = 102, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTag { Id = 3, MapId = 101, TagId = 103, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTag { Id = 4, MapId = 101, TagId = 104, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTag { Id = 5, MapId = 101, TagId = 105, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTag { Id = 6, MapId = 101, TagId = 106, AssociatedAt = "2024-12-01T10:00:00Z" }
            );
        }
    }
}
