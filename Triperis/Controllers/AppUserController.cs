using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Triperis.Models;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace Triperis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
        private string JwtCode = "1234567890123456";

        public AppUserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
        }

        // POST: api/AppUser/Register
        // Might want to check if there are already users with same username or email, but eh... Maybe in the future
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(AppUserRegisterDto newUser)
        {
            newUser.Role = "User";
            var user = new AppUser()
            {
                UserName = newUser.UserName,
                Email = newUser.Email,
                CanCreateListings = true,
                PhoneNumber = newUser.Phone,
                CanComment = true
            };
            var result = await _userManager.CreateAsync(user, newUser.Password);
            await _userManager.AddToRoleAsync(user, newUser.Role);
            return Ok(result);
        }

        // POST: api/AppUser/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            var user  = await _userManager.FindByNameAsync(login.UserName);

            if(user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {
                var roles = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim("UserId", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, roles.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.JwtCode)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Neteisingi prisijungimo duomenys" });
            }
        }
    }
}
