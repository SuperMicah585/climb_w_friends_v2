using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ClimbWithFriendsAPI.Data
{
    public class GradeRangeFilter
    {
        public int Id {get;set;}
        public int MapId {get;set;}
        public string Auth0Id{get;set;}
        public string FromGrade{get;set;}
        public string ToGrade{get;set;}
        public string Type{get;set;}
        public string CreatedAt { get; set; }


        public Map Maps {get;set;}
    }
}
