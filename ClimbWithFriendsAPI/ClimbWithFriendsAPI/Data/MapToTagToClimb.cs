namespace ClimbWithFriendsAPI.Data
{
    public class MapToTagToClimb
    {
        public int Id { get; set; } // Primary key
        public int MapId { get; set; }
        public int ClimbId {get;set;}
        public int TagId { get; set; }
        public string AssociatedAt { get; set; }
        
        
        // Navigation property
        public Map Map { get; set; }
    }
}

