namespace Triperis.Models
{
    public class AddReactionDto
    {
        public int UserId { get; set; }
        public int CommentId { get; set; }
        public string ReactionType { get; set; }
    }
}
