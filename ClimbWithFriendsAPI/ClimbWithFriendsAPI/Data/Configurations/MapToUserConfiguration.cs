using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
public class MapToUserConfiguration : IEntityTypeConfiguration<MapToUser>
{
    public void Configure(EntityTypeBuilder<MapToUser> builder)
    {
        builder.HasKey(mu => mu.Id);

        builder.Property(mu => mu.MapId).IsRequired();
        builder.Property(mu => mu.UserId).IsRequired();
        builder.Property(mu => mu.AssociatedAt).IsRequired();

        // Define relationship with cascade delete
        builder.HasOne(mu => mu.Map)
               .WithMany()
               .HasForeignKey(mu => mu.MapId)
               .OnDelete(DeleteBehavior.Cascade);  // This will delete MapToUser entries when Map is deleted

        builder.HasOne(mu => mu.User)  // Add User relationship
               .WithMany()
               .HasForeignKey(mu => mu.UserId)
               .OnDelete(DeleteBehavior.Cascade);


    }
}