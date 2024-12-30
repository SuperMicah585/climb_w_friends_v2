using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClimbWithFriendsAPI.Data;
using ClimbWithFriendsAPI.DTOs;

namespace ClimbWithFriendsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClimbChatsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClimbChatsController(AppDbContext context)
        {
            _context = context;
        }

        //allow us to get specific chats by id

        [HttpGet("{climbChatId}")]
        public async Task<ActionResult<ClimbChat>> GetClimbChat(int climbChatId)
        {
            var climbChat = await _context.ClimbChats.FindAsync(climbChatId);

            if (climbChat == null)
            {
                return NotFound();
            }

            return climbChat;
        }
        [HttpGet("{climbId}/OnMap/{mapId}/List")]
        public async Task<ActionResult<List<ClimbChatResponse>>> ListClimbChats(int climbId, int mapId)
            {
                var climbChats = await _context.ClimbChats
                    .Where(cc => cc.ClimbId == climbId && cc.MapId == mapId)
                    .OrderBy(c => c.CreatedAt)
                    .Select(c => new ClimbChatResponse
                    {
                        ClimbChatId = c.ClimbChatId,  // Assuming Id is the primary key
                        Message = c.Message,
                        Username = c.User.Username,
                        Auth0Id = c.User.Auth0ID,
                        CreatedAt = c.CreatedAt
                    })
                    .ToListAsync();

                return Ok(climbChats);
            }


        [HttpPost("ToMap/{mapId}/ToUser/{auth0Id}/ToClimb/{climbId}")]
        public async Task<ActionResult<List<ClimbChatResponse>>> PostClimbChat(int mapId, string auth0Id, int climbId, [FromBody] ClimbChatDTO payloadClimbChat)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Auth0ID == auth0Id);
            if (user == null)
            {
                return NotFound($"User with auth0Id '{auth0Id}' not found.");
            }

            var MapToFeatureToClimb = await _context.MapToFeatureToClimbs.FirstOrDefaultAsync(mu=>mu.MapId ==mapId && mu.ClimbId ==climbId);
           

            if (MapToFeatureToClimb == null)
            {
                return NotFound($"Climb not found");
            }

            // save changes and get the resulting ID and save to UserToClimb

                // Create new climbChat
                var climbChat = new ClimbChat {
                    MapId = mapId,
                    UserId = user.UserId,
                    ClimbId = climbId,
                    MapToFeatureToClimbId = MapToFeatureToClimb.Id,
                    Message = payloadClimbChat.Message,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                };
            
                _context.ClimbChats.Add(climbChat);
                await _context.SaveChangesAsync();
                
                var responseForClient = await ListClimbChats(climbId,mapId);


                return responseForClient;
            
        }
        //In case we want people to be able to delete their messages
        [HttpDelete("{climbChatId}")]
        public async Task<ActionResult> RemoveClimbChatFromClimb(int climbChatId)
        {
            // Check if the map exists
            var climbChat = await _context.ClimbChats.FindAsync(climbChatId);
            if (climbChat == null)
            {
                return NotFound($"Map with ID {climbChatId} does not exist.");
            }

            // Remove the user-to-map association
            _context.ClimbChats.Remove(climbChat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Put Request to update a Map object. 
        //In case we want to allow people to edit their messages
        /*
        [HttpPut("{climbChatId}")]
        public async Task<IActionResult> UpdateClimbChat(int climbChatId, [FromBody] ClimbChatDTO climbChatDTO)
        {
            var existingClimbChat = await _context.ClimbChats.FindAsync(climbChatId);

            if (existingClimbChat == null)
            {
                return NotFound($"Map with ID {climbChatId} not found.");
            }

            // Update the fields
            existingClimbChat.Message = climbChatDTO.Message;
            existingClimbChat.UpdatedAt = DateTime.UtcNow.ToString("o"); // Update the timestamp

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return NoContent(); // 204 No Content for a successful update
        }

        private bool MapExists(int id)
        {
            return _context.Maps.Any(e => e.MapId == id);
        }
        */
    }
}