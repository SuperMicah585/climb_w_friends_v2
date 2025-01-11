using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ClimbWithFriendsAPI.Data
{
    public class TagFilter
    {
        public int Id {get;set;}
        public int TagId { get; set; }
        public int MapId {get;set;}
        public string Auth0Id{get;set;}
        public int MaptoTagId {get;set;}
        public string CreatedAt { get; set; }
        public int MapToUserId {get;set;}

        public MapToUser MapToUsers { get; set; }
        public MapToTag MapToTags { get; set; }

    }
}
