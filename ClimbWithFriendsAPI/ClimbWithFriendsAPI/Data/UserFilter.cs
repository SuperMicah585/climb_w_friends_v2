using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ClimbWithFriendsAPI.Data
{
    public class UserFilter
    {
        public int Id {get;set;}
        public int MapId {get;set;}
        public int UserId {get;set;}
        public string Auth0Id{get;set;}
        public string Auth0IdToFilter{get;set;}
        public int MapToUserId {get;set;}
        public string CreatedAt { get; set; }

        public MapToUser MapToUsers { get; set; }
        public User Users{get;set;}

    }
}
