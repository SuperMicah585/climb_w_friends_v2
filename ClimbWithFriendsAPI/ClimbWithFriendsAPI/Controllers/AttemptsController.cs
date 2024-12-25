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
    public class AttemptsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AttemptsController(AppDbContext context)
        {
            _context = context;
        }



        // GET: api/Maps/5
        [HttpGet("{attemptId}")]
        public async Task<ActionResult<Attempt>> GetAttempt(int attemptId)
        {
            var attempt = await _context.Attempts.FindAsync(attemptId);

            if (attempt == null)
            {
                return NotFound();
            }

            return attempt;
        }




      
[HttpPost("ToMap/{mapId}/ToUser/{auth0Id}/ToClimb/{climbId}")]
public async Task<ActionResult<Attempt>> PostAttempt(int mapId, string auth0Id, int climbId, [FromBody] AttemptDTO payloadAttempt)
{
    var user = await _context.Users.FirstOrDefaultAsync(u => u.Auth0ID == auth0Id);
    if (user == null)
    {
        return NotFound($"User with auth0Id '{auth0Id}' not found.");
    }

    // Check for existing attempt
    var existingAttempt = await _context.Attempts.FirstOrDefaultAsync(a => 
        a.MapId == mapId && 
        a.UserId == user.UserId && 
        a.ClimbId == climbId);

    if (existingAttempt != null)
    {
        // Update existing attempt
        existingAttempt.Attempts = payloadAttempt.Attempts;
        existingAttempt.Difficulty = payloadAttempt.Difficulty;
        existingAttempt.Notes = payloadAttempt.Notes;
        existingAttempt.UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

        await _context.SaveChangesAsync();
        return Ok(existingAttempt);
    }
    else
    {
        // Create new attempt
        var attempt = new Attempt {
            MapId = mapId,
            UserId = user.UserId,
            ClimbId = climbId,
            Attempts = payloadAttempt.Attempts,
            Difficulty = payloadAttempt.Difficulty,
            Notes = payloadAttempt.Notes,
            CreatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
            UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
        };
    
        _context.Attempts.Add(attempt);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetAttempt", new { attemptId = attempt.AttemptId }, attempt);
    }
}
  

        [HttpDelete("{attemptId}")]
        public async Task<ActionResult> RemoveAttemptFromClimb(int attemptId)
        {


            // Check if the map exists
            var attempt = await _context.Attempts.FindAsync(attemptId);
            if (attempt == null)
            {
                return NotFound($"Map with ID {attemptId} does not exist.");
            }

            // Remove the user-to-map association
            _context.Attempts.Remove(attempt);
            await _context.SaveChangesAsync();


            return NoContent();
        }

        //Put Request to update a Map object. 
        [HttpPut("{attemptId}")]
        public async Task<IActionResult> UpdateAttempt(int attemptId, [FromBody] AttemptDTO attemptDTO)
        {
  

            var existingAttempt = await _context.Attempts.FindAsync(attemptId);

            if (existingAttempt == null)
            {
                return NotFound($"Map with ID {attemptId} not found.");
            }

            // Update the fields
     
            existingAttempt.Attempts = attemptDTO.Attempts;     
            existingAttempt.Difficulty = attemptDTO.Difficulty;
            existingAttempt.Notes = attemptDTO.Notes;
            existingAttempt.UpdatedAt = DateTime.UtcNow.ToString("o"); // Update the timestamp

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
