namespace ClimbWithFriendsAPI.Data
{
    public class ClimbToTag
    {
        public int Id { get; set; } // Primary key
        public int ClimbId { get; set; }
        public int TagId { get; set; }
        public string AssociatedAt { get; set; }
        
        
        // Navigation property
    public Climb Climb { get; set; } // Reference to Climb
    public Tag Tag { get; set; }     // Reference to Tag
    }
}

