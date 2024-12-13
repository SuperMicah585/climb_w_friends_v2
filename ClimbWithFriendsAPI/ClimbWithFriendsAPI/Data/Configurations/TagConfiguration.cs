using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class TagConfiguration : IEntityTypeConfiguration<Tag>
{
    public void Configure(EntityTypeBuilder<Tag> builder)
    {
        builder.HasKey(t => t.TagId);

        builder.Property(t => t.TagName)
            .IsRequired()
            .HasMaxLength(10);
   

        // Seed data
        builder.HasData(
            new Tag
            {
     
                TagName = "woop",
                TagId = 101,
                CreatedAt = "2024-11-01T09:00:00Z",
                UpdatedAt = "2024-11-10T09:00:00Z"
            },
            new Tag
            {

                TagName = "hype",
                TagId = 102,
                CreatedAt = "2024-11-02T10:00:00Z",
                UpdatedAt = "2024-11-11T10:00:00Z"
            },
            new Tag
            {
  
                TagName = "blue",
                TagId = 103,
                CreatedAt = "2024-11-03T11:00:00Z",
                UpdatedAt = "2024-11-12T11:00:00Z"
            },
            new Tag
            {

                TagName = "great",
                TagId = 104,
                CreatedAt = "2024-11-04T12:00:00Z",
                UpdatedAt = "2024-11-13T12:00:00Z"
            },
            new Tag
            {
                TagName = "amazing",
                TagId = 105,
                CreatedAt = "2024-11-05T13:00:00Z",
                UpdatedAt = "2024-11-14T13:00:00Z"
            },
            new Tag
            {
                TagName = "coolio",
                TagId = 106,
                CreatedAt = "2024-11-05T13:00:00Z",
                UpdatedAt = "2024-11-14T13:00:00Z"
            }
        );
    }
}
