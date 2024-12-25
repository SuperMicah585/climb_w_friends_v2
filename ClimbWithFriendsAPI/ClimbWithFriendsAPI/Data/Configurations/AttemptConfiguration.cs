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
            
      
            builder.Property(a => a.Notes).HasMaxLength(500);
       

            // Configure relationships
            builder.HasOne(a => a.User) // Navigation property to User entity
                   .WithMany()          // Assuming User doesn't have a collection of 
                   .HasForeignKey(a => a.UserId);

            builder.HasOne(a => a.Map) // Navigation property to Map entity
                   .WithMany()         // Assuming Map doesn't have a collection of 
                   .HasForeignKey(a => a.MapId);

            builder.HasOne(a => a.Climb) // Navigation property to Climb entity
                   .WithMany()           // Assuming Climb doesn't have a collection of 
                   .HasForeignKey(a => a.ClimbId);

            builder.ToTable("Attempts");
        }
    }
}
