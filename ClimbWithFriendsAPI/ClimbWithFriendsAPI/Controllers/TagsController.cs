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
    public class TagsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TagsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tag>> GetTag(int id)
        {
            var tag = await _context.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();  // Tag with the specified ID was not found
            }
            return Ok(tag);  // Return the tag as a response
        }

        [HttpGet("ByMap/{id}")]
        public async Task<ActionResult<IEnumerable<Tag>>> GetTagsByMapId(int id)
        {
            var tags = await _context.MapToTags
                .Where(mt => mt.MapId == id) // Filter by the given mapId
                .Join(_context.Tags,         // Join with the Tags table
                    mt => mt.TagId,           // MapToTags.TagId
                    t => t.TagId,             // Tags.TagId
                    (mt, t) => t)             // Project the Tag part of the join
                .ToListAsync(); // Use ToListAsync to retrieve the tags list

            return Ok(tags);
        }

        [HttpPost]
        public async Task<ActionResult<Tag>> PostTag(Tag tag)
        {
            // Ensure the ID is not set by the client
            tag.CreatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");
            tag.UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTag), new { id = tag.TagId }, tag);
        }

[HttpPost("{tagId}/ToMap/{mapId}")]
public async Task<ActionResult<bool>> AddTagToMap(int tagId, int mapId)
{
    try
    {
        var newAssociation = new MapToTag
        {
            MapId = mapId,
            TagId = tagId,
            AssociatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
        };

        _context.MapToTags.Add(newAssociation);
        await _context.SaveChangesAsync();

        return Ok(true); // Return true upon successful operation
    }
    catch (Exception ex)
    {
        // Log the exception (if logging is configured)
        // Return false or a meaningful error response
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}


[HttpPost("{tagId}/ToClimb/{climbId}/OnMap/{mapId}")]
public async Task<ActionResult<bool>> AddTagToClimb(int tagId, int climbId,int mapId)
{
    try
    {
        var newAssociation = new ClimbToTag
        {
            ClimbId = climbId,
            TagId = tagId,
            MapId = mapId,
            AssociatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
        };

        _context.ClimbToTags.Add(newAssociation);
        await _context.SaveChangesAsync();

        return Ok(true); // Return true upon successful operation
    }
    catch (Exception ex)
    {
        // Log the exception (if logging is configured)
        // Return a meaningful error response
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}


[HttpDelete("{tagId}/FromClimb/{climbId}")]
public async Task<ActionResult<bool>> RemoveTagFromClimb(int tagId, int climbId)
{
    if (climbId <= 0 || tagId <= 0)
    {
        return BadRequest("Invalid climbId or tagId.");
    }

    var tagClimbAssociation = await _context.ClimbToTags
        .FirstOrDefaultAsync(mt => mt.TagId == tagId && mt.ClimbId == climbId);

    if (tagClimbAssociation == null)
    {
        return NotFound($"No association found for Tag ID {tagId} on Climb ID {climbId}.");
    }

    _context.ClimbToTags.Remove(tagClimbAssociation);
    await _context.SaveChangesAsync();

    return Ok(true); // Return true upon successful deletion
}

[HttpDelete("{tagId}/Maps/{mapId}")]
public async Task<ActionResult<bool>> RemoveTagFromMap(int mapId, int tagId)
{
    if (mapId <= 0 || tagId <= 0)
    {
        return BadRequest("Invalid mapId or tagId.");
    }

    var tagMapAssociation = await _context.MapToTags
        .FirstOrDefaultAsync(mt => mt.TagId == tagId && mt.MapId == mapId);

    var tagAssociation = await _context.Tags
        .FirstOrDefaultAsync(mt => mt.TagId == tagId);

    if (tagMapAssociation == null)
    {
        return NotFound($"No association found for Tag ID {tagId} on Map ID {mapId}.");
    }

        if (tagAssociation == null)
    {
        return NotFound($"No association found for Tag ID {tagId}");
    }

    _context.MapToTags.Remove(tagMapAssociation);
    await _context.SaveChangesAsync();

     _context.Tags.Remove(tagAssociation);
    await _context.SaveChangesAsync();

    return Ok(true); // Return true upon successful deletion
}

    }
}
