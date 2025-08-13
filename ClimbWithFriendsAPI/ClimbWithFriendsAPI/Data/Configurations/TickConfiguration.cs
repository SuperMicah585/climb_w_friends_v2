using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClimbWithFriendsAPI.Data.Configurations
{
    public class TickConfiguration : IEntityTypeConfiguration<Tick>
    {
        public void Configure(EntityTypeBuilder<Tick> builder)
        {
            builder.HasKey(t => t.TickId);

            builder.Property(t => t.MapId).IsRequired();
            builder.Property(t => t.ClimbId).IsRequired();
            builder.Property(a => a.MapToUserToClimbId).IsRequired();
            builder.Property(t => t.UserId).IsRequired();

            // Configure relationships with cascade delete
            builder.HasOne(t => t.User) // Navigation property to User entity
                   .WithMany()          // Assuming User doesn't have a collection of Ticks
                   .HasForeignKey(t => t.UserId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete when User is deleted

            builder.HasOne(t => t.Map) // Navigation property to Map entity
                   .WithMany()         // Assuming Map doesn't have a collection of Ticks
                   .HasForeignKey(t => t.MapId);


            builder.HasOne(t => t.Climb) // Navigation property to Climb entity
                   .WithMany()           // Assuming Climb doesn't have a collection of Ticks
                   .HasForeignKey(t => t.ClimbId);


            builder.HasOne(t => t.MapToUserToClimb)
                   .WithMany()
                   .HasForeignKey(t => t.MapToUserToClimbId)  // Changed from Id
                   .OnDelete(DeleteBehavior.Cascade);

            

            builder.ToTable("Ticks");
        }
    }
}
