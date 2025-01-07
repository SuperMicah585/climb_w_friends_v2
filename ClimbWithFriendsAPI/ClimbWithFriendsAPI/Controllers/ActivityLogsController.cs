using ClimbWithFriendsAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ClimbWithFriendsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityLogController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ActivityLogController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetActivities([FromQuery] int mapId, [FromQuery] DateTime? sinceTimestamp = null)
        {
            // Validate input
            if (mapId <= 0)
            {
                return BadRequest(new { Message = "Invalid mapId" });
            }

            // Use raw SQL if sinceTimestamp is provided
            if (sinceTimestamp.HasValue)
            {
                var activities = await _context.ActivityLogs
                    .FromSqlRaw(
                        @"SELECT * FROM ""ActivityLogs""
                  WHERE ""MapId"" = {0} 
                  AND ""UpdatedAt""::timestamp > {1}::timestamp 
                  ORDER BY ""UpdatedAt""::timestamp DESC",
                        mapId, sinceTimestamp.Value.ToString("yyyy-MM-ddTHH:mm:ssZ"))
                    .ToListAsync();

                return Ok(activities);
            }

            // If no sinceTimestamp is provided, fetch all activities for the mapId
            var allActivities = await _context.ActivityLogs
                .Where(a => a.MapId == mapId)
                .OrderByDescending(a => DateTime.Parse(a.UpdatedAt)) // Safe here since it's parsed after fetching
                .ToListAsync();

            return Ok(allActivities);
        }

    }

}
