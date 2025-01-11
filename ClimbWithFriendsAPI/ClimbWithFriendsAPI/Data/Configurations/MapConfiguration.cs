using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class MapConfiguration : IEntityTypeConfiguration<Map>
{
    public void Configure(EntityTypeBuilder<Map> builder)
    {
        builder.HasKey(m => m.MapId);

        builder.Property(m => m.MapName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(m => m.Description)
            .HasMaxLength(500);



    }
}
