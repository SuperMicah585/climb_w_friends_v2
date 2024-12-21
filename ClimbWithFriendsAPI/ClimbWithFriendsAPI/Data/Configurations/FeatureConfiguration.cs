using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries; // For spatial geometry types
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class FeatureConfiguration : IEntityTypeConfiguration<Feature>
{
    public void Configure(EntityTypeBuilder<Feature> builder)
    {
    builder.Property(f => f.FeatureId)
    .ValueGeneratedOnAdd();

        builder.Property(f => f.MapId)
            .IsRequired();

        builder.Property(f => f.Type)
            .IsRequired(); 

        // Seed data
        builder.HasData(
    
    //there are already feautres on map
    //
    
    
    new Feature
    {
        FeatureId = 1,
        MapId = 101,
        Type = "Feature",
        CreatedAt = "2024-12-01T10:00:00Z",
        UpdatedAt = "2024-12-01T10:00:00Z"
    }
);

    }
}
