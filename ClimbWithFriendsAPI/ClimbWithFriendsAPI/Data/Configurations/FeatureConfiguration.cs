using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetTopologySuite.Geometries; // For spatial geometry types

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

        // Define the relationship between Feature and Map
        builder.HasOne(f => f.Map)
            .WithMany()
            .HasForeignKey(f => f.MapId)
            .OnDelete(DeleteBehavior.Cascade);

    }
}