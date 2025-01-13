namespace ClimbWithFriendsAPI.Data
{
    using System;
    using Newtonsoft.Json;
    using NetTopologySuite.Geometries;
    using CsvHelper.Configuration;

    public class Climb
    {
        public int ClimbId { get; set; }
        public string ClimbName { get; set; }
        public string Location { get; set; }
        public string State { get; set; }  // New State property
        private NetTopologySuite.Geometries.Point _coordinates;
        public ICollection<ClimbToTag> ClimbToTags { get; set; }
        
        [JsonIgnore]
        public NetTopologySuite.Geometries.Point Coordinates
        {
            get => _coordinates;
            set
            {
                if (value == null || double.IsNaN(value.X) || double.IsNaN(value.Y))
                {
                    throw new ArgumentException("Coordinates must have valid X and Y values.");
                }
                _coordinates = value;
            }
        }

        [JsonProperty("coordinates")]
        public double[] SimplifiedCoordinates
        {
            get => Coordinates != null ? new[] { Coordinates.X, Coordinates.Y } : null;
        }

        public string Url { get; set; }
        public string ClimbType { get; set; }
        public string Rating { get; set; }
        public int Pitches { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
        public double AreaLatitude { get; set; }
        public double AreaLongitude { get; set; }
    }

    public class ClimbCsvRecord
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public double AreaLatitude { get; set; }
        public double AreaLongitude { get; set; }
        public string Url { get; set; }
        public string RouteType { get; set; }
        public string Grade { get; set; }
        public int Pitches { get; set; }
    }

    public class ClimbCsvMap : ClassMap<ClimbCsvRecord>
    {
        public ClimbCsvMap()
        {
            Map(m => m.Id).Name("id");
            Map(m => m.Name).Name("name");
            Map(m => m.Location).Name("Location");
            Map(m => m.AreaLatitude).Name("Area Latitude");
            Map(m => m.AreaLongitude).Name("Area Longitude");
            Map(m => m.Url).Name("URL");
            Map(m => m.RouteType).Name("Route Type");
            Map(m => m.Grade).Name("grade");
            Map(m => m.Pitches).Name("Pitches");
        }
    }
}