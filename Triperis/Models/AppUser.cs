using Microsoft.AspNetCore.Identity;

namespace Triperis.Models
{
    public class AppUser : IdentityUser<int>
    {
        public bool CanCreateListings { get; set; }
        public bool CanComment { get; set; }

        //Relationships
        public List<Car> Cars { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
