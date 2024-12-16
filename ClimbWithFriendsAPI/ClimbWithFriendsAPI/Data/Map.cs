using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ClimbWithFriendsAPI.Data
{
    public class Map
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Database generates this
        public int MapId { get; set; }
        public string MapName { get; set; }
        public string Description { get; set; }
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }

        public ICollection<MapToTag>? MapToTags { get; set; }
    }
}