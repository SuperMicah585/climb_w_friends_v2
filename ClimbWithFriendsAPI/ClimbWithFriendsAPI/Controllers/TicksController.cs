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
    public class TicksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TicksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Maps/5
        [HttpGet("{tickId}")]
        public async Task<ActionResult<Tick>> GetTick(int tickId)
        {
            var tick = await _context.Ticks.FindAsync(tickId);

            if (tick == null)
            {
                return NotFound();
            }

            return tick;
        }

        [HttpPost("ToMap/{mapId}/ToUser/{auth0Id}/ToClimb/{climbId}")]
        public async Task<ActionResult<Tick>> PostTick(int mapId, string auth0Id, int climbId, [FromBody] TickDTO payloadTick)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Auth0ID == auth0Id);
            if (user == null)
            {
                return NotFound($"User with auth0Id '{auth0Id}' not found.");
            }

            var UserToClimb = await _context.MapToUserToClimbs.FirstOrDefaultAsync(mu=>mu.Auth0ID == auth0Id && mu.MapId ==mapId && mu.ClimbId ==climbId);

            if (UserToClimb == null)
            {
                return NotFound($"User with auth0Id '{auth0Id}' not found in reltion to this climb.");
            }

            // Check for existing tick
            var existingTick = await _context.Ticks.FirstOrDefaultAsync(a => 
                a.MapId == mapId && 
                a.UserId == user.UserId && 
                a.ClimbId == climbId);

            if (existingTick != null)
            {
                // Update existing tick
                existingTick.Attempts = payloadTick.Attempts;
                existingTick.Difficulty = payloadTick.Difficulty;
                existingTick.Notes = payloadTick.Notes;
                existingTick.UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

                await _context.SaveChangesAsync();
                return Ok(existingTick);
            }
            else
            {
                // Create new tick
                var tick = new Tick {
                    MapId = mapId,
                    UserId = user.UserId,
                    ClimbId = climbId,
                    Attempts = payloadTick.Attempts,
                    MapToUserToClimbId = UserToClimb.Id,
                    Difficulty = payloadTick.Difficulty,
                    Notes = payloadTick.Notes,
                    CreatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                    UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                };
            
                _context.Ticks.Add(tick);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTick", new { tickId = tick.TickId }, tick);
            }
        }

        [HttpDelete("{tickId}")]
        public async Task<ActionResult> RemoveTickFromClimb(int tickId)
        {
            // Check if the map exists
            var tick = await _context.Ticks.FindAsync(tickId);
            if (tick == null)
            {
                return NotFound($"Map with ID {tickId} does not exist.");
            }

            // Remove the user-to-map association
            _context.Ticks.Remove(tick);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Put Request to update a Map object. 
        [HttpPut("{tickId}")]
        public async Task<IActionResult> UpdateTick(int tickId, [FromBody] TickDTO tickDTO)
        {
            var existingTick = await _context.Ticks.FindAsync(tickId);

            if (existingTick == null)
            {
                return NotFound($"Map with ID {tickId} not found.");
            }

            // Update the fields
            existingTick.Attempts = tickDTO.Attempts;     
            existingTick.Difficulty = tickDTO.Difficulty;
            existingTick.Notes = tickDTO.Notes;
            existingTick.UpdatedAt = DateTime.UtcNow.ToString("o"); // Update the timestamp

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
    }
}