using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ClimbWithFriendsAPI.Data
{
    public class Attempt
    {
        public int AttemptId {get;set;}
        public int MapId { get; set; }
        public int ClimbId { get; set; }
        public int UserId {get;set;}
        public string Attempts { get; set; }
        public string Difficulty { get; set; }
        public string Notes { get; set; }
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }

        public User User { get; set; }
        public Map Map { get; set; }
        public Climb Climb { get; set; }

    }
}