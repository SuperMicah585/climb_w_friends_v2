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
        public NetTopologySuite.Geometries.Point Coordinates { get; set; }


        public string Url { get; set; }

        public List<String> ClimbType { get; set; }

        public string Rating { get; set; }

        public int Pitches { get; set; }
        public string Description { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }

    }
}