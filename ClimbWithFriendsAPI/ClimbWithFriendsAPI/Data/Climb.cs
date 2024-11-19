using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;
using NetTopologySuite.Geometries;

namespace ClimbWithFriendsAPI.Data
{
    public class Climb
    {
        public int ClimbId { get; set; }
        public string ClimbName { get; set; }

        public String Location { get; set; }

        //valuetuple, ideally stored as Point type in postgres
        private NetTopologySuite.Geometries.Point _coordinates;
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
        public string Url { get; set; }

        public String ClimbType { get; set; } // Comma-separated string
        public string Rating { get; set; }
        public int Pitches { get; set; }
        public string Description { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }

    }
}