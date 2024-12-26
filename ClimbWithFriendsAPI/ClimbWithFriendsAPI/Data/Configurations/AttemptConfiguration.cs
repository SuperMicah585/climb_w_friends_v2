using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class AttemptConfiguration : IEntityTypeConfiguration<Attempt>
    {
        public void Configure(EntityTypeBuilder<Attempt> builder)
        {
            builder.HasKey(a => a.AttemptId);

            builder.Property(a => a.MapId).IsRequired();
            builder.Property(a => a.ClimbId).IsRequired();
            builder.Property(a => a.UserId).IsRequired();
            builder.Property(a => a.MapToUserToClimbId).IsRequired();
            builder.Property(a => a.Notes).HasMaxLength(500);

            // Configure relationships with cascade delete
            builder.HasOne(a => a.User) // Navigation property to User entity
                   .WithMany()          // Assuming User doesn't have a collection of Attempts
                   .HasForeignKey(a => a.UserId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete when User is deleted

            builder.HasOne(a => a.Map) // Navigation property to Map entity
                   .WithMany()         // Assuming Map doesn't have a collection of Attempts
                   .HasForeignKey(a => a.MapId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Map is deleted

            builder.HasOne(a => a.Climb) // Navigation property to Climb entity
                   .WithMany()           // Assuming Climb doesn't have a collection of Attempts
                   .HasForeignKey(a => a.ClimbId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Climb is deleted
            builder.HasOne(t => t.MapToUserToClimb)
                   .WithMany()
                   .HasForeignKey(t => t.MapToUserToClimbId)  // Changed from Id
                   .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("Attempts");
        }
    }
}
