namespace ClimbWithFriendsAPI.DTOs
{
    public class MapToUserPayload
    {
        public String UserId { get; set; }
    }

}

public class UpdateMapDto
{
    public string MapName { get; set; } // For updating MapName
    public string Description { get; set; } // For updating Description
}

public class MapToTagPayload
{
    public int MapId { get; set; } // For updating Description
}



