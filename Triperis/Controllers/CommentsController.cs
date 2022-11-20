using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Triperis.Data;
using Triperis.Models;

namespace Triperis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext dbContext;
        private UserManager<AppUser> _userManager;
        public CommentsController(AppDbContext dbContext, UserManager<AppUser> userManager)
        {
            this.dbContext = dbContext;
            this._userManager = userManager;
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddComment([FromBody] CommentCreateDto comment)
        {
            AppUser user = await _userManager.FindByIdAsync(comment.UserId.ToString());
            var newComment = new Comment()
            {
                Text = comment.Text,
                User = user,
                CarId = comment.CarId,
                IsEdited = false,

                CreationDate = DateTime.Now
            };
            dbContext.Comments.Add(newComment);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(AddComment), new CommentDto()
            {
                Id = newComment.Id,
                Text = newComment.Text,
                CreationDate = newComment.CreationDate,
                Username = newComment.User != null ? newComment.User.UserName : "[ištrintas]",
                CarId = newComment.CarId,
                IsEdited = newComment.IsEdited
            });
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> DeleteComment([FromRoute] int id)
        {
            var existingComment = await dbContext.Comments.FirstOrDefaultAsync(x => x.Id == id);
            if (existingComment != null)
            {
                dbContext.Comments.Remove(existingComment);
                await dbContext.SaveChangesAsync();
                return Ok(existingComment);
            }
            return NotFound("Comment not found");
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCommentsByCarId([FromRoute] int id)
        {
            //var comments = await dbContext.Comments.Include(c => c.User).Where(x => x.CarId == id).ToListAsync();
            var comments = await dbContext.Cars.Where(c => c.Id == id).Include(c => c.Comments).ThenInclude(c => c.User).Select(c => c.Comments).FirstOrDefaultAsync();
            if (comments.Count != 0)
            {
                var commentDtos = new List<CommentDto>();
                foreach (var comment in comments)
                {
                    var commentDto = new CommentDto()
                    {
                        Id = comment.Id,
                        Text = comment.Text,
                        CreationDate = comment.CreationDate,
                        Username = comment.User != null ? comment.User.UserName : "[ištrintas]",
                        CarId = comment.CarId,
                        IsEdited = comment.IsEdited
                    };
                    commentDtos.Add(commentDto);
                }
                return Ok(commentDtos);
            }
            return NotFound("No Comments");
        }

        [HttpGet]
        [Route("v2/{id}")]
        public async Task<IActionResult> GetCommentById([FromRoute] int id)
        {
            var comment = await dbContext.Comments.Include(c => c.User).Where(c => c.Id == id).FirstOrDefaultAsync();
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(new CommentDto(){
                Id = comment.Id,
                Text = comment.Text,
                CreationDate = comment.CreationDate,
                Username = comment.User != null ? comment.User.UserName : "[ištrintas]",
                CarId = comment.CarId,
                IsEdited = comment.IsEdited
            });
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> EditComment([FromRoute] int id, [FromBody] string text)
        {
            var comment = dbContext.Comments.Include(c => c.User).Where(c => c.Id == id).FirstOrDefault();
            if(comment == null)
            {
                return NotFound();
            }

            var claimsUserId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            if (claimsUserId != comment.User.Id)
            {
                return Forbid();
            }

            comment.Text = text;
            comment.IsEdited = true;
            await dbContext.SaveChangesAsync();
            return Ok(new CommentDto()
            {
                Id = comment.Id,
                Text = comment.Text,
                CreationDate = comment.CreationDate,
                Username = comment.User != null ? comment.User.UserName : "[ištrintas]",
                CarId = comment.CarId,
                IsEdited = comment.IsEdited
            });
        }
    }
}
