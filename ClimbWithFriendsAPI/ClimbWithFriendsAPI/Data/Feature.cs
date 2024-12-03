using System.ComponentModel.DataAnnotations;

namespace ClimbWithFriendsAPI.Data
{
    public class Feature
    {
        public int Id { get; set; }

        // Geometry properties for storing latitude and longitude
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        // Properties for climb data
        public string ClimbId { get; set; }
        public string ClimbName { get; set; }
        public string Grade { get; set; }
        public List<string> ClimberNames { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }


    }
}