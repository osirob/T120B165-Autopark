namespace Triperis.Models
{
    public class CommentHierarchy : CommentDto
    {
        public List<ReactionDto> Reactions { get; set; }
    }
}
