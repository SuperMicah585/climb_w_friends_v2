namespace ClimbWithFriendsAPI.DTOs
{
    public class MapToUserDTO
    {
        public String UserId { get; set; }
    }

}

public class UpdateMapDto
{
    public string MapName { get; set; } // For updating MapName
    public string Description { get; set; } // For updating Description
}

public class TickDTO
{
        public string Attempts { get; set; }
        public string Difficulty { get; set; }
        public string Notes { get; set; }
}

public class AttemptDTO
{
        public string Attempts { get; set; }
        public string Difficulty { get; set; }
        public string Notes { get; set; }
}

public class MapToTagDTO
{
    public int MapId { get; set; } // For updating Description
}

public class ClimbChatDTO
{
    public string Message{get;set;}
}


