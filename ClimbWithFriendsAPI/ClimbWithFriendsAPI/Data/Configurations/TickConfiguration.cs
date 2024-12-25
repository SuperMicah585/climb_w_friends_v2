using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class TickConfiguration : IEntityTypeConfiguration<Tick>
    {
        public void Configure(EntityTypeBuilder<Tick> builder)
        {
            builder.HasKey(t => t.TickId);
            builder.Property(t => t.MapId).IsRequired();
            builder.Property(t => t.ClimbId).IsRequired();
            builder.Property(t => t.UserId).IsRequired();
       

            // Configure relationships
            builder.HasOne(t => t.User) // Navigation property to User entity
                   .WithMany()          // Assuming User doesn't have a collection of 
                   .HasForeignKey(t => t.UserId);

            builder.HasOne(t => t.Map) // Navigation property to Map entity
                   .WithMany()         // Assuming Map doesn't have a collection of 
                   .HasForeignKey(t => t.MapId);

            builder.HasOne(t => t.Climb) // Navigation property to Climb entity
                   .WithMany()           // Assuming Climb doesn't have a collection of 
                   .HasForeignKey(t => t.ClimbId);

            builder.ToTable("Ticks");
        }
    }
}
