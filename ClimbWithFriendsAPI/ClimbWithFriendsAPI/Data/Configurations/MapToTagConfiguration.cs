using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class MapToTagConfiguration : IEntityTypeConfiguration<MapToTag>
{
    public void Configure(EntityTypeBuilder<MapToTag> builder)
    {
        builder.HasKey(mt => mt.Id);

        builder.Property(mt => mt.MapId).IsRequired();
        builder.Property(mt => mt.TagId).IsRequired();
        builder.Property(mt => mt.AssociatedAt).IsRequired();

        // Tag relationship
        builder.HasOne(mt => mt.Tag)
           .WithMany(t => t.MapToTags)
           .HasForeignKey(mt => mt.TagId)
           .OnDelete(DeleteBehavior.Cascade);

        // Map relationship with cascade delete
        builder.HasOne(mt => mt.Map)
           .WithMany()
           .HasForeignKey(mt => mt.MapId)
           .OnDelete(DeleteBehavior.Cascade);

        builder.ToTable("MapToTags");

    }
}