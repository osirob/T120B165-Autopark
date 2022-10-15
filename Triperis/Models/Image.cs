using System.ComponentModel.DataAnnotations;

namespace Triperis.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string Path { get; set; }


        [Required]
        public int CarId { get; set; }
        public Car Car { get; set; }

    }
}
