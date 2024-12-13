using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries; // For spatial geometry types
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class FeatureConfiguration : IEntityTypeConfiguration<Feature>
{
    public void Configure(EntityTypeBuilder<Feature> builder)
    {
        builder.HasKey(f => f.FeatureId);

        builder.Property(f => f.MapId)
            .IsRequired();

        builder.Property(f => f.CoordinatesList)
            .IsRequired(); // Adjust if GeoFeature needs to be required or not
        builder.Property(f => f.Type)
            .IsRequired(); 

        // Seed data
        builder.HasData(
    new Feature
    {
        FeatureId = 1,
        MapId = 101,
        Type = "Feature",
        CoordinatesList = new List<Point> 
        { 
            new Point(-122.3321, 47.6062) { SRID = 4326 } // Seattle 
        },
        Climbs = new List<int> { 1, 2 }, // Example climb IDs
        CreatedAt = "2024-12-01T10:00:00Z",
        UpdatedAt = "2024-12-01T10:00:00Z"
    },
    new Feature
    {
        FeatureId = 2,
        MapId = 101,
        Type = "Feature",
        CoordinatesList = new List<Point> 
        { 
            new Point(-117.1557, 47.6588) { SRID = 4326 } // Spokane 
        },
        Climbs = new List<int> { 1, 2 }, // Example climb IDs
        CreatedAt = "2024-12-01T10:00:00Z",
        UpdatedAt = "2024-12-01T10:00:00Z"
    },
    new Feature
    {
        FeatureId = 3,
        MapId = 101,
        Type = "Feature",
        CoordinatesList = new List<Point> 
        { 
            new Point(-122.2090, 47.6101) { SRID = 4326 } // Bellevue 
        },
        Climbs = new List<int> { 3, 4 }, // Example climb IDs
        CreatedAt = "2024-12-01T10:00:00Z",
        UpdatedAt = "2024-12-01T10:00:00Z"
    },
    new Feature
    {
        FeatureId = 4,
        MapId = 101,
        Type = "Feature",
        CoordinatesList = new List<Point> 
        { 
            new Point(-122.6765, 48.5126) { SRID = 4326 } // Anacortes 
        },
        Climbs = new List<int> { 5, 6 }, // Example climb IDs
        CreatedAt = "2024-12-01T10:00:00Z",
        UpdatedAt = "2024-12-01T10:00:00Z"
    },
    new Feature
    {
        FeatureId = 5,
        MapId = 101,
        Type = "Feature",
        CoordinatesList = new List<Point> 
        { 
            new Point(-122.6762, 47.2529) { SRID = 4326 } // Tacoma 
        },
        Climbs = new List<int> { 7, 8 }, // Example climb IDs
        CreatedAt = "2024-12-01T10:00:00Z",
        UpdatedAt = "2024-12-01T10:00:00Z"
    },
    new Feature
    {
        FeatureId = 6,
        MapId = 101,
        Type = "Feature",
        CoordinatesList = new List<Point> 
        { 
            new Point(-122.3321, 48.7625) { SRID = 4326 } // Bellingham 
        },
        Climbs = new List<int> { 9, 10 }, // Example climb IDs
        CreatedAt = "2024-12-01T10:00:00Z",
        UpdatedAt = "2024-12-01T10:00:00Z"
    }
);

    }
}
