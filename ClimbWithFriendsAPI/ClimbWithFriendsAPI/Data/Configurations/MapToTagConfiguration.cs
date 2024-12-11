using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class MapToTagConfiguration : IEntityTypeConfiguration<MapToTag>
    {
        public void Configure(EntityTypeBuilder<MapToTag> builder)
        {
            builder.HasKey(mt => mt.Id);

            builder.Property(mt => mt.MapId).IsRequired();
            builder.Property(mt => mt.TagId).IsRequired();
            builder.Property(mt => mt.AssociatedAt).IsRequired();

            // Define relationship
            builder.HasOne(mt => mt.Map)
                   .WithMany() // Assuming no back-reference in Map
                   .HasForeignKey(mt => mt.MapId);

            builder.ToTable("MapToTags");

            // Seed Data
            builder.HasData(
                new MapToTag { Id = 1, MapId = 101, TagId = 101, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTag { Id = 2, MapId = 102, TagId = 102, AssociatedAt = "2024-12-02T11:00:00Z" },
                new MapToTag { Id = 3, MapId = 103, TagId = 103, AssociatedAt = "2024-12-03T12:00:00Z" },
                new MapToTag { Id = 4, MapId = 104, TagId = 104, AssociatedAt = "2024-12-02T12:00:00Z" },
                new MapToTag { Id = 5, MapId = 101, TagId = 102, AssociatedAt = "2024-12-03T14:00:00Z" },
                new MapToTag { Id = 6, MapId = 105, TagId = 105, AssociatedAt = "2024-12-04T15:00:00Z" }
            );
        }
    }
}



/*
steps to make changes run on local postgress database 

1) change all instances of PK_MapsToUsers to PK_MapToUsers within .cs files

2) Run the following SQL

ALTER TABLE "MapToUsers"
RENAME CONSTRAINT "PK_MapsToUsers" TO "PK_MapToUsers";

3) dotnet ef migrations add AddUserIdAsString

4) dotnet ef database update 
*/

