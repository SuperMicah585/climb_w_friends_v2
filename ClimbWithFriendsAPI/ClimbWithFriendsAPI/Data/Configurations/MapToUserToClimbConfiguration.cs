using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class MapToUserToClimbConfiguration : IEntityTypeConfiguration<MapToUserToClimb>
    {
        public void Configure(EntityTypeBuilder<MapToUserToClimb> builder)
        {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.ClimbId).IsRequired();
            builder.Property(u => u.MapId).IsRequired();
            builder.Property(u => u.UserId).IsRequired();
            builder.Property(u => u.Auth0ID).IsRequired();
            builder.Property(u => u.AssociatedAt).IsRequired();

            // Configure relationships
            builder.HasOne(u => u.User) // Navigation property to User entity
                   .WithMany()          // Assuming User doesn't have a collection of MapToUserToClimb
                   .HasForeignKey(u => u.UserId);

            builder.HasOne(u => u.Map) // Navigation property to Map entity
                   .WithMany()         // Assuming Map doesn't have a collection of MapToUserToClimb
                   .HasForeignKey(u => u.MapId);

            builder.HasOne(u => u.Climb) // Navigation property to Climb entity
                   .WithMany()           // Assuming Climb doesn't have a collection of MapToUserToClimb
                   .HasForeignKey(u => u.ClimbId);

            builder.ToTable("MapToUserToClimbs");
        }
    }
}
