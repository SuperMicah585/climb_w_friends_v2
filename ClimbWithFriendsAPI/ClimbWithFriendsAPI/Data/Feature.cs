using System.Collections.Generic;
using System.Linq; // For FirstOrDefault
using NetTopologySuite.Geometries; // Requires NetTopologySuite for geometry support
using Newtonsoft.Json; // For JSON serialization

namespace ClimbWithFriendsAPI.Data
{
    public class Feature
    {
        public int FeatureId { get; set; }
        public int MapId { get; set; }
        public string Type { get; set; }

        // Backing field for coordinates
        private List<Point> _coordinatesList;

        // Ignoring the coordinates list in JSON output
        [JsonIgnore]
        public List<Point> CoordinatesList
        {
            get => _coordinatesList;
            set => _coordinatesList = value ?? new List<Point>();
        }

        // SimplifiedCoordinates will be included in JSON output
        [JsonProperty("coordinates")]
        public double[] SimplifiedCoordinates
        {
            get
            {
                var simplifiedCoords = _coordinatesList?.FirstOrDefault() is Point firstPoint
                    ? new[] { firstPoint.X, firstPoint.Y }
                    : null;

                // Print statement for testing
       

                return simplifiedCoords;
            }
        }

        public List<int> Climbs { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }


public class FeatureDependencies
{
    public List<Tag> Tags { get; set; } // Collection of tags
    public Climb Climb { get; set; }    // Single climb
}

}
