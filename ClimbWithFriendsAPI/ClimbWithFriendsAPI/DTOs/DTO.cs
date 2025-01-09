using ClimbWithFriendsAPI.Data;
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

public class FilterDTO
{
       public List<TagFilter> TagFilters { get; set; } = new List<TagFilter>();
        public List<GradeRangeFilter> GradeRangeFilters { get; set; } = new List<GradeRangeFilter>();
        public List<UserFilter> UserFilters { get; set; } = new List<UserFilter>();
}

public class GradeRangeFilterDTO
{
    public string FromGrade {get;set;}
    public string ToGrade{get;set;}
    public string Type{get;set;} 

}