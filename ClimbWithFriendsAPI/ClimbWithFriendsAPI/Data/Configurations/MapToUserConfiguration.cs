using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class MapToUserConfiguration : IEntityTypeConfiguration<MapToUser>
    {
        public void Configure(EntityTypeBuilder<MapToUser> builder)
        {
            builder.HasKey(mu => mu.Id);

            builder.Property(mu => mu.MapId).IsRequired();
            builder.Property(mu => mu.UserId).IsRequired();
            builder.Property(mu => mu.AssociatedAt).IsRequired();

            // Define relationship
            builder.HasOne(mu => mu.Map)
                   .WithMany() // Assuming no back-reference in Map
                   .HasForeignKey(mu => mu.MapId);

            // Seed Data
            builder.HasData(
                new MapToUser { Id = 1, MapId = 101, UserId = "google-oauth2|100195696035167038572", AssociatedAt = "2024-12-01T10:00:00Z" },
                new MapToUser { Id = 2, MapId = 102, UserId = "google-oauth2|100195696035167038572", AssociatedAt = "2024-12-02T11:00:00Z" },
                new MapToUser { Id = 3, MapId = 103, UserId = "google-oauth2|100195696035167038572", AssociatedAt = "2024-12-03T12:00:00Z" },
                new MapToUser { Id = 4, MapId = 104, UserId = "google-oauth2|112911737438637748824", AssociatedAt = "2024-12-02T12:00:00Z" },
                new MapToUser { Id = 5, MapId = 101, UserId = "google-oauth2|112911737438637748824", AssociatedAt = "2024-12-03T14:00:00Z" },
                new MapToUser { Id = 6, MapId = 105, UserId = "google-oauth2|112911737438637748824", AssociatedAt = "2024-12-04T15:00:00Z" }
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

