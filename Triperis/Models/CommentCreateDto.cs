namespace Triperis.Models
{
    public class CommentCreateDto
    {
        public string Text { get; set; }
        public string Username { get; set; }
        public int CarId { get; set; }
        public int UserId { get; set; }
    }
}
