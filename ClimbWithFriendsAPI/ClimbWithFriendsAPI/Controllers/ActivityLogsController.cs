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

            // Query the activity logs
            var query = _context.ActivityLogs.AsQueryable();

            // Filter by mapId
            query = query.Where(a => a.MapId == mapId);

            // Filter by timestamp if provided
            if (sinceTimestamp.HasValue)
            {
                query = query.Where(a => DateTime.Parse(a.UpdatedAt) > sinceTimestamp.Value);
            }

            // Execute query
            var activities = await query
                .OrderByDescending(a => DateTime.Parse(a.UpdatedAt))
                .ToListAsync();

            // Return the result
            return Ok(activities);
        }
    }

}
