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

            List<ActivityLog> activities;

            // Use raw SQL if sinceTimestamp is provided
            if (sinceTimestamp.HasValue)
            {
                 activities = await _context.ActivityLogs
                    .FromSqlRaw(
                        @"SELECT * FROM ""ActivityLogs""
              WHERE ""MapId"" = {0} 
              AND ""UpdatedAt""::timestamp > {1}::timestamp 
              ORDER BY ""UpdatedAt""::timestamp DESC",
                        mapId, sinceTimestamp.Value.ToString("yyyy-MM-ddTHH:mm:ssZ"))
                    .ToListAsync();

                // Fetch user details for each unique UserId, excluding email
                var userIds = activities.Select(al => al.UserId).Distinct().ToList();
                var userInfo = await _context.Users
                    .Where(u => userIds.Contains(u.Auth0ID))
                    .Select(u => new
                    {
                        u.Auth0ID,
                        u.Name,
                        u.Username, // Replace with actual fields from the Users table
                    })
                    .ToDictionaryAsync(u => u.Auth0ID);
                // Get the current UTC datetime
                var currentDateTime = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

                // Return the result with activities and the current datetime
                return Ok(new
                {
                    CurrentDateTime = currentDateTime,
                    Activities = activities,
                    UserInfo = userInfo
                });
            }
            else
            {
                // If no sinceTimestamp is provided, fetch all activities for the mapId
                activities = await _context.ActivityLogs
                    .Where(a => a.MapId == mapId)
                    .ToListAsync();

                // Perform client-side sorting
                activities = activities
                    .OrderByDescending(a => DateTime.Parse(a.UpdatedAt))
                    .ToList();

                // Fetch user details for each unique UserId, excluding email
                var userIds = activities.Select(al => al.UserId).Distinct().ToList();
                var userInfo = await _context.Users
                    .Where(u => userIds.Contains(u.Auth0ID))
                    .Select(u => new
                    {
                        u.Auth0ID,
                        u.Name,
                        u.Username, // Replace with actual fields from the Users table
                    })
                    .ToDictionaryAsync(u => u.Auth0ID);
                // Get the current UTC datetime
                var currentDateTime = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

                // Return the result with activities and the current datetime
                return Ok(new
                {
                    CurrentDateTime = currentDateTime,
                    Activities = activities,
                    UserInfo = userInfo
                });
            }


           
        }

    }

}
