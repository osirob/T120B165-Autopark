using System.ComponentModel.DataAnnotations;

namespace Triperis.Models
{
    public class Reaction
    {
        [Key]
        public int Id { get; set; }
        public string ReactionType { get; set; }

        [Required]
        public int CommentId { get; set; }
        public Comment Comment { get; set; }

        public AppUser? User { get; set; }

    }
}
