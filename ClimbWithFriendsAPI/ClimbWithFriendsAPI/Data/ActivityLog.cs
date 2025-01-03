using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ClimbWithFriendsAPI.Data
{
    public class ActivityLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Database generates this
        public int ActivityLogId { get; set; }

        public string UserId { get; set; }
        public string Action { get; set; } //AddClimb RemoveClimb UserJoined UserLeft
        public string Details { get; set; }

        public string? UpdatedAt { get; set; }

    }
}