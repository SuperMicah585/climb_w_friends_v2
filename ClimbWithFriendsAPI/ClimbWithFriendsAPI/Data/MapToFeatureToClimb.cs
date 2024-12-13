namespace ClimbWithFriendsAPI.Data
{
    public class MapToFeatureToClimb
    { //will not be used except for interal uses to check on climb popularity. 
        public int Id { get; set; } // Primary key
        public int MapId { get; set; }
        public int ClimbId {get;set;}
        public int FeatureId { get; set; }
        public string AssociatedAt { get; set; }
        
        
        // Navigation property
        public Map Map { get; set; }
    }
}

