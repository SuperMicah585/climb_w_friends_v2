using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClimbWithFriendsAPI.Data.Configurations
{
    public class ClimbToTagConfiguration : IEntityTypeConfiguration<ClimbToTag>
    {
        public void Configure(EntityTypeBuilder<ClimbToTag> builder)
        {
            // Define primary key
            builder.HasKey(ct => ct.Id);

            // Ensure required fields
            builder.Property(ct => ct.ClimbId).IsRequired();
            builder.Property(ct => ct.TagId).IsRequired();
            builder.Property(ct => ct.AssociatedAt).IsRequired();
            builder.Property(ct => ct.MapId).IsRequired();

            // Define relationship with Climb
            builder.HasOne(ct => ct.Climb)
                   .WithMany(c => c.ClimbToTags) // Collection in Climb entity
                   .HasForeignKey(ct => ct.ClimbId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Climb is deleted

            // Define relationship with Tag
            builder.HasOne(ct => ct.Tag)
                   .WithMany(t => t.ClimbToTags) // Back-reference in Tag entity
                   .HasForeignKey(ct => ct.TagId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Tag is deleted

            // Define relationship with Map
            builder.HasOne(ct => ct.Map)
                   .WithMany() // Collection in Map entity
                   .HasForeignKey(ct => ct.MapId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Map is deleted

            // Map to database table
            builder.ToTable("ClimbToTags");

        }
    }
}
