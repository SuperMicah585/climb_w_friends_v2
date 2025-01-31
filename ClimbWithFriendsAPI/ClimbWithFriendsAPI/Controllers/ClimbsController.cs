﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClimbWithFriendsAPI.Data;
using Humanizer;

namespace ClimbWithFriendsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClimbsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ActivityLogService _activityLogService;

        public ClimbsController(AppDbContext context, ActivityLogService activityLogService)
        {
            _context = context;
            _activityLogService = activityLogService;
        }

    //api/Climbs/
        [HttpGet("List/{name}/Within/{state}/IsType/{type}")]
        public async Task<ActionResult<IEnumerable<Climb>>> GetClimbsByName(String name, String state, String type)
        {
            // Get maps associated with the user
        var users = await _context.Climbs
            .Where(c => c.ClimbName.ToLower().Contains(name.ToLower()) && 
                        c.State == state && 
                       c.ClimbType.Contains(type))
            .Take(20)
            .ToListAsync();




            return Ok(users);
        }

        [HttpGet("{climbId}/OnMap/{mapId}")]
        public async Task<ActionResult<bool>> GetClimbById(int climbId,int mapId)
        {
            var DoesClimbExist = await _context.MapToFeatureToClimbs.AnyAsync(mfc => mfc.ClimbId==climbId && mfc.MapId == mapId);

            if(DoesClimbExist){
                return Ok(true);
            }

            else{
                return Ok(false);
            }

        }

[HttpGet("{climbId}/Dependencies")]
public async Task<ActionResult<FeatureDependencies>> GetClimbDependenciesById(int climbId)
{
    // Step 1: Fetch the climb object
    var climb = await _context.Climbs
        .FirstOrDefaultAsync(c => c.ClimbId == climbId); // Get the climb

    if (climb == null)
    {
        return NotFound($"Climb with ID {climbId} not found.");
    }

    // Step 2: Filter for given ClimbId
    var tagIds = await _context.ClimbToTags
        .Where(mt => mt.ClimbId == climbId)
        .Select(mt => mt.TagId)
        .ToListAsync(); // Extract TagIds

    // Step 3: Get the tags associated with the filtered MapToTagToClimbs
    var tags = await _context.Tags
        .Where(t => tagIds.Contains(t.TagId))
        .ToListAsync(); // Fetch matching tags

    // Step 4: Combine the climb and tags into FeatureDependencies
    var featureDependencies = new FeatureDependencies
    {
        Climb = climb,
        Tags = tags // Include all tags in an array
    };

    return Ok(featureDependencies);
}


[HttpGet("ByMap/{mapId}/Count")]
public async Task<ActionResult<int>> GetClimbCountByMapId(int mapId)
{
    // Step 1: Fetch the climb count
    var climbCount = await _context.MapToFeatureToClimbs
        .Where(c => c.MapId == mapId)
        .CountAsync(); 

    return Ok(climbCount);
}



[HttpPost("{climbId}/ToUser/{userId}/ToMap/{mapId}")]
public async Task<ActionResult<MapToUserToClimb>> AddMapToUserToClimb(int climbId,int mapId,string userId)
{

    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Auth0ID == userId);

    var userToClimb = await _context.MapToUsers.FirstOrDefaultAsync(mu=>mu.UserId == user.UserId && mu.MapId == mapId);

    var mapToUserToClimb = new MapToUserToClimb
    {
        ClimbId = climbId,
        MapId = mapId,
        Auth0ID = userId,
        UserId = user.UserId,
        MapToUserId = userToClimb.Id,
        AssociatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")

    };

    _context.MapToUserToClimbs.Add(mapToUserToClimb);
            await _context.SaveChangesAsync();
            await _activityLogService.LogActivity(userId, "AddClimb", $"Added to climb {await GetClimbNameById(climbId)}", mapId, climbId);
            return Ok(mapToUserToClimb);
        }
        [HttpDelete("{climbId}/FromUser/{userId}/FromMap/{mapId}")]
        public async Task<ActionResult<MapToUserToClimb>> RemoveMapToUserToClimb(int climbId, int mapId, string userId)
        {
    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Auth0ID == userId);

    if (user == null)
    {
        return NotFound("User not found");
    }

    var mapToUserToClimb = await _context.MapToUserToClimbs
        .FirstOrDefaultAsync(m => 
            m.ClimbId == climbId && 
            m.MapId == mapId && 
            m.UserId == user.UserId);

    if (mapToUserToClimb == null)
    {
        return NotFound("Relationship not found");
    }

    _context.MapToUserToClimbs.Remove(mapToUserToClimb);
            await _activityLogService.LogActivity(userId, "RemoveClimb", $"Removed from climb {await GetClimbNameById(climbId)}", mapId, climbId);

            await _context.SaveChangesAsync();

    
    // Check if this was the last user for this climb on this map
    var remainingUsersForClimb = await _context.MapToUserToClimbs
        .AnyAsync(m => m.ClimbId == climbId && m.MapId == mapId);

    if (!remainingUsersForClimb)
    {
        // If no users left, remove the climb from the map
        var mapToFeatureToClimb = await _context.MapToFeatureToClimbs
            .FirstOrDefaultAsync(m => m.ClimbId == climbId && m.MapId == mapId);
            
        if (mapToFeatureToClimb != null)
        {
            // Store the FeatureId before removing the MapToFeatureToClimb
            int featureId = mapToFeatureToClimb.FeatureId;
            
            _context.MapToFeatureToClimbs.Remove(mapToFeatureToClimb);
            await _context.SaveChangesAsync();

            // Check if this was the last reference to this feature
            var remainingFeatureReferences = await _context.MapToFeatureToClimbs
                .AnyAsync(m => m.FeatureId == featureId);

            if (!remainingFeatureReferences)
            {
                // If no references left, remove the feature
                var feature = await _context.Features
                    .FirstOrDefaultAsync(f => f.FeatureId == featureId);

                if (feature != null)
                {
                    _context.Features.Remove(feature);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
            return Ok(mapToUserToClimb);
}

        // Helper Function to Get Climb Name by ID
        private async Task<string> GetClimbNameById(int climbId)
        {
            try
            {
                // Query the database for the climb name
                var climbName = await _context.Climbs
                    .Where(m => m.ClimbId == climbId)
                    .Select(m => m.ClimbName)
                    .FirstOrDefaultAsync();

                return climbName; // Returns null if no climb is found
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                Console.WriteLine($"Error in GetClimbNameById: {ex.Message}");
                throw; // Re-throw the exception for higher-level handling
            }
        }

        //add climb relationship bas
        private bool ClimbExists(int id)
        {
            return _context.Climbs.Any(e => e.ClimbId == id);
        }
    }
}
