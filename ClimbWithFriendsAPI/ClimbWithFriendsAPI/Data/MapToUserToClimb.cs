using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClimbWithFriendsAPI.Data
{
    public class MapToUserToClimb
    {
        public int Id { get; set; } // Primary key
        public int ClimbId { get; set; }
        public int MapId { get; set; }

        public int MapToUserId{get;set;}
        public string Auth0ID { get; set; }
        public int UserId {get;set;}
        public string AssociatedAt { get; set; } // Better to store as DateTime

        // Navigation properties
        public Map? Map { get; set; } // Nullable if not always populated
        public User? User { get; set; }
        public Climb? Climb { get; set; }
        public MapToUser MapToUser{get;set;}
    }
} 

