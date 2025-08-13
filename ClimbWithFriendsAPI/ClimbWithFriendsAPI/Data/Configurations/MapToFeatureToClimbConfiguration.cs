using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClimbWithFriendsAPI.Data.Configurations
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

        }
    }
}