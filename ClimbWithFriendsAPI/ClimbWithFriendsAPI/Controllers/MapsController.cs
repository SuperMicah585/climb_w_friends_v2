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
    public class MapsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MapsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Maps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Map>>> GetMaps()
        {
            return await _context.Maps.ToListAsync();
        }

        // GET: api/Maps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Map>> GetMap(int id)
        {
            var map = await _context.Maps.FindAsync(id);

            if (map == null)
            {
                return NotFound();
            }

            return map;
        }

        // GET: api/Maps/User/5
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<Map>>> GetMapsByUserId(string userId)
        {
            // Get maps associated with the user
            var maps = await _context.MapToUsers
                .Where(mu => mu.UserId == userId)
                .Include(mu => mu.Map) // Ensure related maps are included
                .Select(mu => mu.Map)  // Extract only the Map entities
                .ToListAsync();

            // if we want to return an error response. for now micah has requested an OK and empty list.
            //if (maps == null || maps.Count == 0)
            //{
            //    return NotFound(new { Message = $"No maps found for UserId {userId}" });
            //}

            return Ok(maps);
        }

                // GET: api/Maps/User/5
        [HttpGet("Userlist/{id}")]
        public async Task<ActionResult<IEnumerable<Map>>> GetUsersByMapId(int id)
        {
            // Get maps associated with the user
        var users = await _context.MapToUsers
            .Where(mu => mu.MapId == id)  // Filter by the given mapId
            .ToListAsync();



            return Ok(users);
        }

        //// PUT: api/Maps/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutMap(int id, Map map)
        //{
        //    if (id != map.MapId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(map).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!MapExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Maps
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Map>> PostMap(Map map)
        {
            // Ensure the ID is not set by the client
            map.MapId = 0; // Reset to default, ensuring database handles it

            // Set default value
            map.CreatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"); 
            map.UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"); 
            _context.Maps.Add(map);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMap", new { id = map.MapId }, map);
        }


        // TODO: validate user exists before updating data. need to add user integration before we can do this though.
        [HttpPost("{mapId}/users")]
        public async Task<ActionResult> AddUserToMap(int mapId, [FromBody] MapToUserPayload payload)
        {
            // Validate the request payload
            if (payload == null)
            {
                return BadRequest("Invalid request body. UserId must be provided and greater than zero.");
            }

            // Check if the map exists
            var mapExists = await _context.Maps.AnyAsync(m => m.MapId == mapId);
            if (!mapExists)
            {
                return NotFound($"Map with ID {mapId} does not exist.");
            }

            // Check if the user is already associated with the map
            var existingAssociation = await _context.MapToUsers
                .AnyAsync(mu => mu.MapId == mapId && mu.UserId.Equals(payload.UserId));
            if (existingAssociation)
            {
                return Conflict($"User with ID {payload.UserId} is already associated with map ID {mapId}.");
            }

            // Add the user-to-map association
            var newAssociation = new MapToUser
            {
                MapId = mapId,
                UserId = payload.UserId,
                AssociatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
            };

            _context.MapToUsers.Add(newAssociation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddUserToMap), new { mapId = mapId, userId = payload.UserId }, newAssociation);
        }

        [HttpDelete("{mapId}/users/{userId}")]
        public async Task<ActionResult> RemoveUserFromMap(int mapId, String userId)
        {
            // Validate input
            if (mapId <= 0 || userId.Length == 0)
            {
                return BadRequest("Invalid mapId or userId.");
            }

            // Check if the map exists
            var map = await _context.Maps.FindAsync(mapId);
            if (map == null)
            {
                return NotFound($"Map with ID {mapId} does not exist.");
            }

            // Check if the association exists
            var userAssociation = await _context.MapToUsers
                .FirstOrDefaultAsync(mu => mu.MapId == mapId && mu.UserId == userId);

            if (userAssociation == null)
            {
                return NotFound($"No association found for User ID {userId} on Map ID {mapId}.");
            }

            // Remove the user-to-map association
            _context.MapToUsers.Remove(userAssociation);
            await _context.SaveChangesAsync();

            // Check if the map has any remaining users
            var remainingUsers = await _context.MapToUsers
                .AnyAsync(mu => mu.MapId == mapId);

            if (!remainingUsers)
            {
                // No users left, delete the map
                _context.Maps.Remove(map);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }



        //// DELETE: api/Maps/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteMap(int id)
        //{
        //    var map = await _context.Maps.FindAsync(id);
        //    if (map == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Maps.Remove(map);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool MapExists(int id)
        {
            return _context.Maps.Any(e => e.MapId == id);
        }
    }
}
