using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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
        builder.Property(u => u.MapToUserId).IsRequired();

        // Configure relationships with cascade delete
        builder.HasOne(u => u.User)
               .WithMany()
               .HasForeignKey(u => u.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(u => u.Map)
               .WithMany()
               .HasForeignKey(u => u.MapId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(u => u.Climb)
               .WithMany()
               .HasForeignKey(u => u.ClimbId)
               .OnDelete(DeleteBehavior.Cascade);

       builder.HasOne(u => u.MapToUser)
                   .WithMany()
                   .HasForeignKey(t => t.MapToUserId)  // Changed from Id
                   .OnDelete(DeleteBehavior.Cascade);

     

        builder.ToTable("MapToUserToClimbs");
    }
}
