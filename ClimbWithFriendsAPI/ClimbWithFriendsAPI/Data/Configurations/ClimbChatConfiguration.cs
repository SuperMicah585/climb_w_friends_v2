using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class ClimbChatConfiguration : IEntityTypeConfiguration<ClimbChat>
    {
        public void Configure(EntityTypeBuilder<ClimbChat> builder)
        {
            builder.HasKey(cc => cc.ClimbChatId);

            builder.Property(cc => cc.MapId).IsRequired();
            builder.Property(cc => cc.ClimbId).IsRequired();
            builder.Property(a => a.MapToFeatureToClimbId).IsRequired();
            builder.Property(cc => cc.UserId).IsRequired();

            // Configure relationships with cascade delete
            builder.HasOne(cc => cc.User) // Navigation property to User entity
                   .WithMany()          // Assuming User doesn't have a collection of Ticks
                   .HasForeignKey(cc => cc.UserId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete when User is deleted

            builder.HasOne(cc => cc.Map) // Navigation property to Map entity
                   .WithMany()         // Assuming Map doesn't have a collection of Ticks
                   .HasForeignKey(cc => cc.MapId);

            builder.HasOne(cc => cc.Climb) // Navigation property to Climb entity
                   .WithMany()           // Assuming Climb doesn't have a collection of Ticks
                   .HasForeignKey(cc => cc.ClimbId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Climb is deleted

            builder.HasOne(cc => cc.MapToFeatureToClimb)
                   .WithMany()
                   .HasForeignKey(cc => cc.MapToFeatureToClimbId)  // Changed from Id
                   .OnDelete(DeleteBehavior.Cascade);

       //maptouser dependency

            

            builder.ToTable("ClimbChats");
        }
    }
}
