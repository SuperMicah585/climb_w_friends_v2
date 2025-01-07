using ClimbWithFriendsAPI.Data;

public class ActivityLogService
{
    private readonly AppDbContext _context;

    public ActivityLogService(AppDbContext context)
    {
        _context = context;
    }

    public async Task LogActivity(string userId, string action, string details, int? mapId = null)
    {
        var activity = new ActivityLog
        {
            UserId = userId,
            Action = action,
            UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
            Details = details,
            MapId = mapId
        };

        _context.ActivityLogs.Add(activity);
        await _context.SaveChangesAsync();
    }
}
