namespace Triperis.Models
{
    public class ReactionDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CommentId { get; set; }
        public string ReactionType { get; set; }
    }
}
