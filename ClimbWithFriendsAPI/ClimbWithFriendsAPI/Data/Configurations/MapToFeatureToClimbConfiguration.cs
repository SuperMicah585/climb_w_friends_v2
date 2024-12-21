using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class MapToFeatureToClimbConfiguration : IEntityTypeConfiguration<MapToFeatureToClimb>
    {
        public void Configure(EntityTypeBuilder<MapToFeatureToClimb> builder)
        {
            builder.HasKey(mt => mt.Id);

            builder.Property(mt => mt.MapId).IsRequired();
            builder.Property(mt => mt.FeatureId).IsRequired();
            builder.Property(mt => mt.ClimbId).IsRequired();
            builder.Property(mt => mt.AssociatedAt).IsRequired();

            // Define relationship
            builder.HasOne(mt => mt.Map)
                   .WithMany() // Assuming no back-reference in Map
                   .HasForeignKey(mt => mt.MapId);

            builder.ToTable("MapToFeatureToClimbs");

            // Seed Data
            builder.HasData(
                new MapToFeatureToClimb { Id = 1, MapId = 101, ClimbId = 6, FeatureId = 1, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToFeatureToClimb { Id = 2, MapId = 101, ClimbId = 5, FeatureId = 1, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToFeatureToClimb { Id = 3, MapId = 101, ClimbId = 4, FeatureId = 1, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToFeatureToClimb { Id = 4, MapId = 101, ClimbId = 3, FeatureId = 1, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToFeatureToClimb { Id = 5, MapId = 101, ClimbId = 2, FeatureId = 1, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToFeatureToClimb { Id = 6, MapId = 101, ClimbId = 1, FeatureId = 1, AssociatedAt = "2024-12-01T10:00:00Z" }
            );
        }
    }
}