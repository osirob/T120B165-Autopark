namespace Triperis.Models
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public string Username { get; set; }
        public int CarId { get; set; }
    }
}
