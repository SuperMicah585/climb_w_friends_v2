using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetTopologySuite.Geometries;
using System.Globalization;
using ClimbWithFriendsAPI.Data;
using CsvHelper;

namespace YourProjectNamespace.Data.Configurations
{
    public class ClimbConfiguration : IEntityTypeConfiguration<Climb>
    {
        public void Configure(EntityTypeBuilder<Climb> builder)
        {
            // Define table structure and constraints
            builder.HasKey(c => c.ClimbId);

            builder.Property(c => c.ClimbName).IsRequired().HasMaxLength(150);
            builder.Property(c => c.Location).IsRequired().HasMaxLength(500);
            builder.Property(c => c.Coordinates).IsRequired();
            builder.Property(c => c.Url).HasMaxLength(500);
            builder.Property(c => c.ClimbType).HasMaxLength(100);
            builder.Property(c => c.Rating).HasMaxLength(50);
            builder.Property(c => c.Pitches).IsRequired();

            // Dynamically load seed data from a CSV file
            var climbs = LoadClimbDataFromCsv("Data/Configurations/climb_data.csv");
            builder.HasData(climbs);
        }

        private List<Climb> LoadClimbDataFromCsv(string filePath)
        {
            var climbs = new List<Climb>();

            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                // Define the CSV data structure
                csv.Context.RegisterClassMap<ClimbCsvMap>();

                var records = csv.GetRecords<ClimbCsvRecord>();
                foreach (var record in records)
                {
                    climbs.Add(new Climb
                    {
                        ClimbId = record.Id,
                        ClimbName = record.Name,
                        Location = record.Location,
                        Coordinates = new Point(record.AreaLongitude, record.AreaLatitude) { SRID = 4326 },
                        Url = record.Url,
                        ClimbType = record.RouteType,
                        Rating = record.Grade,
                        Pitches = record.Pitches,
                        CreatedAt = DateTime.UtcNow.ToString("o"),
                        UpdatedAt = DateTime.UtcNow.ToString("o")
                    });
                }
            }

            return climbs;
        }
    }
}
