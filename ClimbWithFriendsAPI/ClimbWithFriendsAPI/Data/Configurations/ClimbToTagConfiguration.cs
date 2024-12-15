using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
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

            // Define relationship with Climb
            builder.HasOne(ct => ct.Climb)
                   .WithMany(c => c.ClimbToTags) // Collection in Climb entity
                   .HasForeignKey(ct => ct.ClimbId)
                   .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Climb is deleted

            // Define relationship with Tag
        builder.HasOne(ct => ct.Tag)
               .WithMany(t => t.ClimbToTags) // Ensure back-reference in Tag entity
               .HasForeignKey(ct => ct.TagId)
               .OnDelete(DeleteBehavior.Cascade); 

            // Map to database table
            builder.ToTable("ClimbToTags");

            // Seed data
            builder.HasData(
                new ClimbToTag { Id = 1, ClimbId = 1, TagId = 101, AssociatedAt = "2024-12-01T10:00:00Z" },
                new ClimbToTag { Id = 2, ClimbId = 1, TagId = 102, AssociatedAt = "2024-12-01T10:00:00Z" },
                new ClimbToTag { Id = 3, ClimbId = 2, TagId = 103, AssociatedAt = "2024-12-01T10:00:00Z" },
                new ClimbToTag { Id = 4, ClimbId = 2, TagId = 104, AssociatedAt = "2024-12-01T10:00:00Z" },
                new ClimbToTag { Id = 5, ClimbId = 3, TagId = 105, AssociatedAt = "2024-12-01T10:00:00Z" },
                new ClimbToTag { Id = 6, ClimbId = 4, TagId = 106, AssociatedAt = "2024-12-01T10:00:00Z" }
            );
        }
    }
}
