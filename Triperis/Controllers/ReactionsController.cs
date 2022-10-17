﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Triperis.Data;
using Triperis.Models;

namespace Triperis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReactionsController : ControllerBase
    {
        private readonly AppDbContext dbContext;
        private UserManager<AppUser> _userManager;

        public ReactionsController(AppDbContext dbContext, UserManager<AppUser> userManager)
        {
            this.dbContext = dbContext;
            this._userManager = userManager;
        }

        [HttpGet]
        [Route("v1/{id}")]
        public async Task<IActionResult> GetReactionsByCommentId([FromRoute] int id)
        {
            var reactions = await dbContext.Reactions.Where(r => r.CommentId == id).Include(r => r.User).ToListAsync();
            var dtos = new List<ReactionDto>();
            foreach (var reaction in reactions)
            {
                dtos.Add(new ReactionDto {
                    Id = reaction.Id,
                    UserId = reaction.User.Id,
                    CommentId = reaction.CommentId,
                    ReactionType = reaction.ReactionType
                });
            }
            return Ok(dtos);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetReactionById([FromRoute] int id)
        {
            var reaction = await dbContext.Reactions.Where(r => r.Id == id).Include(r => r.User).FirstOrDefaultAsync();
            var dto = new ReactionDto() {
                Id = reaction.Id,
                UserId = reaction.User.Id,
                CommentId = reaction.CommentId,
                ReactionType = reaction.ReactionType
            };

            return Ok(dto);
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> AddReaction([FromBody] AddReactionDto reaction)
        {
            var user = await _userManager.FindByIdAsync(reaction.UserId.ToString());
            var dbReaction = new Reaction()
            {
                ReactionType = reaction.ReactionType,
                CommentId = reaction.CommentId,
                User = user
            };
            dbContext.Reactions.Add(dbReaction);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(AddReaction), new ReactionDto
            {
                Id = dbReaction.Id,
                UserId = dbReaction.User.Id,
                ReactionType = dbReaction.ReactionType,
                CommentId = dbReaction.CommentId
            });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveReaction([FromRoute] int id)
        {
            var reaction = await dbContext.Reactions.Where(r => r.Id == id).Include(r => r.User).FirstOrDefaultAsync();
            dbContext.Reactions.Remove(reaction);
            await dbContext.SaveChangesAsync();
            return Ok(new ReactionDto 
            {
                Id = reaction.Id,
                UserId = reaction.User.Id,
                CommentId = reaction.CommentId,
                ReactionType = reaction.ReactionType
            });
        }

        [HttpPut]
        public async Task<IActionResult> ChangeReaction([FromBody] ChangeReactionDto reactionDto )
        {
            var reaction = await dbContext.Reactions.Where(r => r.Id == reactionDto.Id).Include(r => r.User).FirstOrDefaultAsync();
            reaction.ReactionType = reactionDto.ReactionType;
            await dbContext.SaveChangesAsync();
            return Ok(new ReactionDto 
            {
                Id = reaction.Id,
                UserId = reaction.User.Id,
                CommentId = reaction.CommentId,
                ReactionType = reaction.ReactionType
            });
        }
    }
}
