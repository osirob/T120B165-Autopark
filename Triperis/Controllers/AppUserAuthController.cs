using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Triperis.Models;

namespace Triperis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserAuthController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        public AppUserAuthController(UserManager<AppUser> userManager)
        {
            this._userManager = userManager;
        }   

        //GET api/AppUserAuth
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return Ok( new {
                UserName = user.UserName,
                Email = user.Email,
                Phone = user.PhoneNumber,
                Id = user.Id,
                CanCreateListings = user.CanCreateListings,
                CanComment = user.CanComment
            });
        }

        [HttpGet]
        [Route("GetUserById/{id}")]
        public async Task<IActionResult> GetProfileById([FromRoute] int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            return Ok(new {
                UserName = user.UserName,
                Email = user.Email,
                Phone = user.PhoneNumber
            });
        }

        //TESTING METHODS
        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("AdminTest")]
        public string GetAdmin()
        {
            return "Esate Adminas";
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("UserTest")]
        public string GetUser()
        {
            return "Esate Useris";
        }

        [HttpGet]
        [Authorize(Roles = "User,Admin")]
        [Route("Test")]
        public string GetBoth()
        {
            return "Esate Useris arba Adminas";
        }
    }
}
