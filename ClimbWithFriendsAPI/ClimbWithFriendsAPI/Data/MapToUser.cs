namespace ClimbWithFriendsAPI.Data
{
    public class MapToUser
    {
        public int Id { get; set; } // Primary key
        public int MapId { get; set; }
        public int UserId { get; set; }
        public string AssociatedAt { get; set; }
        
        // Navigation property
        public Map Map { get; set; }
    }
}

