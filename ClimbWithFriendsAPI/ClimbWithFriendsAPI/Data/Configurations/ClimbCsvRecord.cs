using CsvHelper.Configuration.Attributes;

namespace ClimbWithFriendsAPI.Data.Configurations
{
    public class ClimbCsvRecord
    {
        [Name("id")]
        public int Id { get; set; }

        [Name("name")]
        public string Name { get; set; } = string.Empty;

        [Name("location")]
        public string Location { get; set; } = string.Empty;

        [Name("url")]
        public string Url { get; set; } = string.Empty;

        [Name("route_type")]
        public string RouteType { get; set; } = string.Empty;

        [Name("grade")]
        public string Grade { get; set; } = string.Empty;

        [Name("pitches")]
        public int Pitches { get; set; }

        [Name("area_latitude")]
        public double AreaLatitude { get; set; }

        [Name("area_longitude")]
        public double AreaLongitude { get; set; }
    }
} 