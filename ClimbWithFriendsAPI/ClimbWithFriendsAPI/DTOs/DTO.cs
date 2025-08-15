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
       public List<TagDTO> TagFilters { get; set; } = new List<TagDTO>();
        public List<GradeRangeFilter> GradeRangeFilters { get; set; } = new List<GradeRangeFilter>();
        public List<UserFilterDTO> UserFilters { get; set; } = new List<UserFilterDTO>();
}

public class TagDTO 
{
public int Id{get;set;}
public int TagId{get;set;}
public string TagName{get;set;}
}

public class UserDTO 
{
    public string Auth0Id{get;set;}
    public string Username{get;set;}
    public string Name{get;set;}
}

public class GradeRangeFilterDTO
{
    public string? FromGrade {get;set;}
    public string? ToGrade{get;set;}
    public string? Type{get;set;} 

}

public class UserFilterDTO
{
    public int Id{get;set;}
    public string Auth0Id{get;set;}
    public string Username{get;set;}
    public string Name{get;set;}

}

public class UserUpdateRequest
{
    public string UserName { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}


