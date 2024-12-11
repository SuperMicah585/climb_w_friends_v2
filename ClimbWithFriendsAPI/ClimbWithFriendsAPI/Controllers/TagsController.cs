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

                public async Task<ActionResult<Map>> GetTag(int id)
            {
                var tag = await _context.Tags.FindAsync(id);
                if (tag == null)
                {
                    return NotFound();  // Map with the specified ID was not found
                }
                return Ok(tag);  // Return the map as a response
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
 

            // Set default value
            tag.CreatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"); 
            tag.UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"); 

            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTag), new { id = tag.TagId }, tag);
        }

        [HttpPost("{tagId}")]
       public async Task<ActionResult> AddTagToMap(int tagId, [FromBody] MapToTagPayload payload)
        {
            // Validate the request payload
   
            if (payload == null)
            {
                return BadRequest("Invalid request body. tagId must be provided and greater than zero.");
            }

            // Check if the map exists
           var map = await _context.Maps.FindAsync(payload.MapId);
    if (map == null)
    {
        return NotFound($"Map with ID {payload.MapId} does not exist.");
    }

            // Add the user-to-map association
            var newAssociation = new MapToTag
            {
                MapId = payload.MapId,
                TagId = tagId,
                AssociatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
            };

            _context.MapToTags.Add(newAssociation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddTagToMap), new { tagId = tagId }, newAssociation);
        }


[HttpDelete("{tagId}/Maps/{mapId}")]
public async Task<ActionResult> RemoveTagFromMap(int mapId, int tagId)
{
    // Validate input
    if (mapId <= 0 || tagId<=0)
    {
        return BadRequest("Invalid mapId or tagId.");
    }

    // Check if the tag-map association exists
    var tagMapAssociation = await _context.MapToTags
        .FirstOrDefaultAsync(mt => mt.TagId == tagId);

    // Check if the tag itself exists
    var tagAssociation = await _context.Tags.FirstOrDefaultAsync(t => t.TagId == tagId);

    // If both are null, nothing to delete
    if (tagMapAssociation == null && tagAssociation == null)
    {
        return NotFound($"No association found for Tag ID {tagId} on Map ID {mapId}.");
    }

    // Remove the entities if they exist
    if (tagMapAssociation != null)
    {
        _context.MapToTags.Remove(tagMapAssociation);
    }

    if (tagAssociation != null)
    {
        _context.Tags.Remove(tagAssociation);
    }

    // Save changes
    await _context.SaveChangesAsync();

    return NoContent();
}
}
}
