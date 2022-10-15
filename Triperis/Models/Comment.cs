using System.ComponentModel.DataAnnotations;

namespace Triperis.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }

        //Im wayy too stupid to make EF core work properly with comments that connect to cars and users
        public AppUser? User { get; set; }

        [Required]
        public int CarId { get; set; }
        public Car Car { get; set; }
    }
}
