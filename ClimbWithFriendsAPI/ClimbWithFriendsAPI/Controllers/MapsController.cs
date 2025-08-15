using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClimbWithFriendsAPI.Data;
using ClimbWithFriendsAPI.DTOs;
using ClimbWithFriendsAPI.Services;

namespace ClimbWithFriendsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ActivityLogService _activityLogService;
        private readonly SupabaseStorageService _storageService;

        public MapsController(AppDbContext context, ActivityLogService activityLogService, SupabaseStorageService storageService)
        {
            _context = context;
            _activityLogService = activityLogService;
            _storageService = storageService;
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
        [HttpGet("User/{auth0Id}")]
        public async Task<ActionResult<IEnumerable<Map>>> GetMapsByUserId(string auth0Id)
        {

             var userObj = await _context.Users.FirstOrDefaultAsync(u => u.Auth0ID == auth0Id);
            if (userObj == null){
                // Handle the case where no user is found
                throw new Exception("User not found");
            }
            var userId = userObj.UserId;
            // Get maps associated with the user
            var maps = await _context.MapToUsers
                .Where(mu => mu.UserId == userId)
                .Include(mu => mu.Map) // Ensure related maps are included
                .Select(mu => mu.Map)  // Extract only the Map entities
                .ToListAsync();

            return Ok(maps);
        }




                // GET: api/Maps/Userlist/5
[HttpGet("Userlist/{mapId}")]
public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsersByMapId(int mapId)
{
    // Get users associated with the map using a join
    var users = await _context.MapToUsers
        .Where(mu => mu.MapId == mapId)  // Filter by MapId first
        .Join(
            _context.Users,
            mapUser => mapUser.UserId,
            user => user.UserId,
            (mapUser, user) => new UserDTO
            {
                Auth0Id = user.Auth0ID,
                Name = user.Name,
                Username = user.Username
            })
        .ToListAsync();

    return Ok(users);
}

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

        // POST: api/Maps/upload-image
        [HttpPost("upload-image")]
        public async Task<ActionResult<object>> UploadMapImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file provided");
                }

                // Validate file type
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
                var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
                
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest("Invalid file type. Only JPG, PNG, GIF, and WebP files are allowed.");
                }

                // Validate file size (max 10MB)
                if (file.Length > 10 * 1024 * 1024)
                {
                    return BadRequest("File size too large. Maximum size is 10MB.");
                }

                // Upload image to Supabase
                using var stream = file.OpenReadStream();
                var imageUrl = await _storageService.UploadImageAsync(stream, file.FileName);

                return Ok(new { 
                    success = true, 
                    imageUrl = imageUrl,
                    fileName = file.FileName
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Failed to upload image: {ex.Message}" });
            }
        }


        // TODO: validate user exists before updating data. need to add user integration before we can do this though.
        [HttpPost("{mapId}/users")]
        public async Task<ActionResult> AddUserToMap(int mapId, [FromBody] MapToUserDTO payload)
        {
            // Validate the request payload
            if (payload == null)
            {
                return BadRequest("Invalid request body. UserId must be provided and greater than zero.");
            }

            // Check if the map exists
           var map = await _context.Maps.FindAsync(mapId);
    if (map == null)
    {
        return NotFound($"Map with ID {mapId} does not exist.");
    }


             var userObj = await _context.Users.FirstOrDefaultAsync(u => u.Auth0ID == payload.UserId);
            if (userObj == null){
                // Handle the case where no user is found
                throw new Exception("User not found");
            }
            var userId = userObj.UserId;
            // Check if the user is already associated with the map
            var existingAssociation = await _context.MapToUsers
                .AnyAsync(mu => mu.MapId == mapId && mu.UserId.Equals(userId));
            if (existingAssociation)
            {
                return Conflict($"User with ID {userId} is already associated with map ID {mapId}.");
            }

            // Add the user-to-map association
            var newAssociation = new MapToUser
            {
                MapId = mapId,
                UserId = userId,
                AssociatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
            };

             var user = await _context.Users.SingleOrDefaultAsync(u => u.Auth0ID == payload.UserId);
    if (user == null)
    {
        return NotFound($"User with ID {payload.UserId} does not exist.");
    }

            var userInformation = new UserDTO
            {
                Auth0Id = user.Auth0ID,
                Username = user.Username,
                Name = user.Name,


            };

var response = new
    {
        UserInformation = userInformation,
        MapAssociation = newAssociation
    };

            _context.MapToUsers.Add(newAssociation);
            await _context.SaveChangesAsync();
            await _activityLogService.LogActivity(payload.UserId, "UserJoined", $"User joined map {await GetMapNameById(mapId)}", mapId);
                return CreatedAtAction(nameof(AddUserToMap), new { mapId, userId = payload.UserId }, response);
        }

        [HttpDelete("{mapId}/users/{auth0Id}")]
        public async Task<ActionResult> RemoveUserFromMap(int mapId, String auth0Id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u=>u.Auth0ID == auth0Id);

            //Join MapToFeatureToClimb with MapToUserToClimb on ClimbId and mapId to get all climbID's that have the user.UserId listed on it
            //Get the count of entries within the table for each entry
            //Delete climbId/MapId combinations from the MapToFeatureToClimb table where count ==1

            //For each featureId in the MapToFeatureToClimb table that gets deleted, need to check if there are any other MapToFeatureToClimb that reference that featureID
            //If not, need to delete the FeatureId

              var userObj = await _context.Users.FirstOrDefaultAsync(u => u.Auth0ID == auth0Id);
            if (userObj == null){
                // Handle the case where no user is found
                throw new Exception("User not found");
            }
            var userId = userObj.UserId;


            // Validate input
            if (mapId <= 0 || userId < 0)
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
            await _activityLogService.LogActivity(auth0Id, "UserLeft", $"User left map {await GetMapNameById(mapId)}", mapId);
            //delete climbs with no users
            await CleanupOrphanedMapToFeatureToClimbs(mapId);
            //delete features with no climbs
            await CleanupOrphanedFeatures(mapId);

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


private async Task CleanupOrphanedFeatures(int mapId)
{
    var featuresToDelete = _context.Features
        .Where(f => f.MapId == mapId)
        .GroupJoin(
            _context.MapToFeatureToClimbs,
            f => new { f.FeatureId, f.MapId },
            mft => new { mft.FeatureId, mft.MapId },
            (f, mftGroup) => new { f, mftGroup }
        )
        .SelectMany(
            x => x.mftGroup.DefaultIfEmpty(),
            (x, mft) => new { Feature = x.f, MapToFeature = mft }
        )
        .Where(x => x.MapToFeature == null)
        .Select(x => x.Feature);

    _context.Features.RemoveRange(featuresToDelete);
    await _context.SaveChangesAsync();
}
private async Task CleanupOrphanedMapToFeatureToClimbs(int mapId)
{
    var featuresToDelete = _context.MapToFeatureToClimbs
        .Where(mft => mft.MapId == mapId)
        .GroupJoin(
            _context.MapToUserToClimbs,
            mft => new { mft.ClimbId, mft.MapId },
            mut => new { mut.ClimbId, mut.MapId },
            (mft, mutGroup) => new { mft, mutGroup }
        )
        .SelectMany(
            x => x.mutGroup.DefaultIfEmpty(),
            (x, mut) => new { Feature = x.mft, User = mut }
        )
        .Where(x => x.User == null)
        .Select(x => x.Feature);

    _context.MapToFeatureToClimbs.RemoveRange(featuresToDelete);
    await _context.SaveChangesAsync();
}


        //Put Request to update a Map object. 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMap(int id, [FromBody] UpdateMapDto updateMapDto)
        {
            if (updateMapDto == null)
            {
                return BadRequest("Request body cannot be null.");
            }

            var existingMap = await _context.Maps.FindAsync(id);

            if (existingMap == null)
            {
                return NotFound($"Map with ID {id} not found.");
            }

            // Update the fields
            if (!string.IsNullOrWhiteSpace(updateMapDto.MapName))
            {
                existingMap.MapName = updateMapDto.MapName;
            }

            if (!string.IsNullOrWhiteSpace(updateMapDto.Description))
            {
                existingMap.Description = updateMapDto.Description;
            }

            existingMap.UpdatedAt = DateTime.UtcNow.ToString("o"); // Update the timestamp

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

        // Helper Function to Get Map Name by ID
        private async Task<string> GetMapNameById(int mapId)
        {
            try
            {
                // Query the database for the map name
                var mapName = await _context.Maps
                    .Where(m => m.MapId == mapId)
                    .Select(m => m.MapName)
                    .FirstOrDefaultAsync();

                return mapName; // Returns null if no map is found
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                Console.WriteLine($"Error in GetMapNameById: {ex.Message}");
                throw; // Re-throw the exception for higher-level handling
            }
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
