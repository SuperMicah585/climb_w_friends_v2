using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ClimbWithFriendsAPI.Data
{
    public class ClimbChat
    {
        public int ClimbChatId {get;set;}
        public int MapId { get; set; }
        public int ClimbId { get; set; }
        public int UserId {get;set;}
        public int MapToFeatureToClimbId {get;set;}
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public User User { get; set; }
        public Map Map { get; set; }
        public Climb Climb { get; set; }
      public MapToFeatureToClimb MapToFeatureToClimb {get;set;}
    

    }

    public class ClimbChatResponse
    {
      public string Message {get;set;}
      public string Username {get;set;}
      public int ClimbChatId {get;set;}
      public string Auth0Id {get;set;}
      public DateTime CreatedAt {get;set;}
    }
}