using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class MapToTagToClimbConfiguration : IEntityTypeConfiguration<MapToTagToClimb>
    {
        public void Configure(EntityTypeBuilder<MapToTagToClimb> builder)
        {
            builder.HasKey(mt => mt.Id);

            builder.Property(mt => mt.MapId).IsRequired();
            builder.Property(mt => mt.TagId).IsRequired();
            builder.Property(mt => mt.ClimbId).IsRequired();
            builder.Property(mt => mt.AssociatedAt).IsRequired();

            // Define relationship
            builder.HasOne(mt => mt.Map)
                   .WithMany() // Assuming no back-reference in Map
                   .HasForeignKey(mt => mt.MapId);

            builder.ToTable("MapToTagsToCimbs");

            // Seed Data
            builder.HasData(
                new MapToTagToClimb { Id = 1, MapId = 101, ClimbId = 6, TagId = 101, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTagToClimb { Id = 2, MapId = 101, ClimbId = 5, TagId = 102, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTagToClimb { Id = 3, MapId = 101, ClimbId = 4, TagId = 103, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTagToClimb { Id = 4, MapId = 101, ClimbId = 3, TagId = 104, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTagToClimb { Id = 5, MapId = 101, ClimbId = 2, TagId = 105, AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToTagToClimb { Id = 6, MapId = 101, ClimbId = 1, TagId = 106, AssociatedAt = "2024-12-01T10:00:00Z" }
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

