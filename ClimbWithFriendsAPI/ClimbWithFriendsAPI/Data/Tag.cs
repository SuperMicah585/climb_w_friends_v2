using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ClimbWithFriendsAPI.Data
{
    public class Tag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Database generates this
        public int TagId { get; set; }

        [Required]
        [MaxLength(10)]
        public string TagName { get; set; }

        public string? CreatedAt { get; set; }

        public string? UpdatedAt { get; set; }



        public ICollection<ClimbToTag>? ClimbToTags { get; set; }
        public ICollection<MapToTag>? MapToTags { get; set; }
    }
}


//down the road discuss if we want to assign user id to created maps