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
        private const int BatchSize = 1000;

        public void Configure(EntityTypeBuilder<Climb> builder)
        {
            // Define table structure and constraints
            builder.HasKey(c => c.ClimbId);

            builder.Property(c => c.ClimbName).IsRequired().HasMaxLength(150);
            builder.Property(c => c.Location).IsRequired().HasMaxLength(500);
            builder.Property(c => c.State).IsRequired().HasMaxLength(50);
            builder.Property(c => c.Coordinates).IsRequired();
            builder.Property(c => c.Url).HasMaxLength(500);
            builder.Property(c => c.ClimbType).HasMaxLength(100);
            builder.Property(c => c.Rating).HasMaxLength(50);
            builder.Property(c => c.Pitches).IsRequired();
        }

        private string ExtractStateFromLocation(string location)
        {
            if (string.IsNullOrEmpty(location))
                return string.Empty;

            var parts = location.Split('>');
            return parts.Length > 0 ? parts[parts.Length - 1].Trim() : string.Empty;
        }

        public async Task SeedDataAsync(DbContext context, string filePath)
        {
            // Check if data already exists
            if (await context.Set<Climb>().AnyAsync())
            {
                return; // Skip seeding if data exists
            }

            using var reader = new StreamReader(filePath);
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

            csv.Context.RegisterClassMap<ClimbCsvMap>();

            var batch = new List<Climb>();
            var records = csv.GetRecords<ClimbCsvRecord>();
            var count = 0;

            foreach (var record in records)
            {
                var climb = new Climb
                {
                    ClimbId = record.Id,
                    ClimbName = record.Name,
                    Location = record.Location,
                    State = ExtractStateFromLocation(record.Location),
                    Coordinates = new Point(record.AreaLongitude, record.AreaLatitude) { SRID = 4326 },
                    Url = record.Url,
                    ClimbType = record.RouteType,
                    Rating = record.Grade,
                    Pitches = record.Pitches,
                    CreatedAt = DateTime.UtcNow.ToString("o"),
                    UpdatedAt = DateTime.UtcNow.ToString("o")
                };

                batch.Add(climb);
                count++;

                if (count % BatchSize == 0)
                {
                    await SaveBatchAsync(context, batch);
                    batch.Clear();
                }
            }

            // Save any remaining records
            if (batch.Any())
            {
                await SaveBatchAsync(context, batch);
            }
        }

        private async Task SaveBatchAsync(DbContext context, List<Climb> batch)
        {
            try
            {
                await context.Set<Climb>().AddRangeAsync(batch);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error saving batch of climbs: {ex.Message}", ex);
            }
        }
    }


}