using CsvHelper.Configuration.Attributes;

namespace ClimbWithFriendsAPI.Data.Configurations
{
    public class ClimbCsvRecord
    {
        [Name("id")]
        public int Id { get; set; }

        [Name("name")]
        public string Name { get; set; } = string.Empty;

            [Name("Location")]
    public string Location { get; set; } = string.Empty;

    [Name("URL")]
    public string Url { get; set; } = string.Empty;

    [Name("Route Type")]
    public string RouteType { get; set; } = string.Empty;

    [Name("grade")]
    public string Grade { get; set; } = string.Empty;

    [Name("Pitches")]
    public int Pitches { get; set; }

    [Name("Area Latitude")]
    public double AreaLatitude { get; set; }

    [Name("Area Longitude")]
    public double AreaLongitude { get; set; }
    }
} 