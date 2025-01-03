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
    public class FiltersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FiltersController(AppDbContext context)
        {
            _context = context;
        }

//Get,Post and Delete methods for tag,user, and grade range tables. 7 methods

[HttpGet("OnMap/{mapId}/ForUser/{auth0Id}/List")]
public async Task<ActionResult<List<FilterDTO>>> ListFiltersOnMap(int mapId, string auth0Id)
{
    // Query tag filters
    var tagFilters = await _context.TagFilters
        .Include(tf => tf.MapToTags)
        .Where(tf => tf.MapId == mapId && tf.Auth0Id == auth0Id)
        .ToListAsync();

    // Query grade range filters
    var gradeRangeFilters = await _context.GradeRangeFilters
        .Include(grf => grf.Maps)
        .Where(grf => grf.MapId == mapId && grf.Auth0Id == auth0Id)
        .ToListAsync();

    // Query user filters
    var userFilters = await _context.UserFilters
        .Include(uf => uf.MapToUsers)
        .Include(uf => uf.Users)
        .Where(uf => uf.MapId == mapId && uf.Auth0Id == auth0Id)
        .ToListAsync();

    // Create the DTO
    var filterDTO = new FilterDTO
    {
        TagFilters = tagFilters,
        GradeRangeFilters = gradeRangeFilters,
        UserFilters = userFilters
    };

    return Ok(new List<FilterDTO> { filterDTO });
}

[HttpPost("Tag/{tagId}/ToMap/{mapId}/ForUser/{auth0Id}")]
public async Task<ActionResult<TagFilter>> AddTagFilterToMap(int mapId, string auth0Id, int tagId)
{
    // Fetch current UTC time for createdAt
    var createdAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"); 

    // Query the MapToTags table for the relationship
    var mapToTag = await _context.MapToTags
        .FirstOrDefaultAsync(mu => mu.MapId == mapId && mu.TagId == tagId);

    // Check if the relationship exists
    if (mapToTag == null)
    {
        return BadRequest("The Tag to Map relationship doesn't exist");
    }

    // Create the TagFilter object
    var tagFilterObject = new TagFilter
    {
        TagId = tagId,
        MapId = mapId,
        Auth0Id = auth0Id,
        MaptoTagId = mapToTag.Id,
        CreatedAt = createdAt
    };

    // Add the object to the TagFilters table
    _context.TagFilters.Add(tagFilterObject);

    // Save changes to the database
    await _context.SaveChangesAsync();

    // Return the created object
    return Ok(tagFilterObject);
}




[HttpPost("User/{auth0IdToFilter}/ToMap/{mapId}/ForUser/{auth0Id}")]
public async Task<ActionResult<UserFilter>> AddUserFilterToMap(int mapId, string auth0Id, string auth0IdToFilter)
{
    // Fetch current UTC time for createdAt
    var createdAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"); 

    // Query the MapToTags table for the relationship
    var mapToUser = await _context.MapToUsers
        .FirstOrDefaultAsync(mu => mu.MapId == mapId && mu.UserId == auth0IdToFilter);

    var User = await _context.Users
        .FirstOrDefaultAsync(mu => mu.Auth0ID == auth0IdToFilter);

    // Check if the relationship exists
    if (mapToUser == null)
    {
        return BadRequest("The UserFilter to Map relationship doesn't exist");
    }

    // Create the TagFilter object
    var userFilterObject = new UserFilter
    {
        UserId = User.UserId,
        MapId = mapId,
        Auth0Id = auth0Id,
        MapToUserId = mapToUser.Id,
        CreatedAt = createdAt
    };

    // Add the object to the TagFilters table
    _context.UserFilters.Add(userFilterObject);

    // Save changes to the database
    await _context.SaveChangesAsync();

    // Return success
    return Ok(userFilterObject);
}

[HttpPost("GradeRangeFilter/ToMap/{mapId}/ForUser/{auth0Id}")]
public async Task<ActionResult<GradeRangeFilter>> AddGradeRangeFilterToMap(int mapId, string auth0Id,[FromBody] GradeRangeFilterDTO payload)
{
    // Fetch current UTC time for createdAt
    var createdAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"); 
    if(payload ==null){
        return BadRequest("Payload information is null");
    }
    // Create the TagFilter object
    var GradeRangeFilterObject = new GradeRangeFilter
    {

        MapId = mapId,
        Auth0Id = auth0Id,
        FromGrade = payload.FromGrade,
        ToGrade = payload.ToGrade,
        Type = payload.Type,
        CreatedAt = createdAt
    };

    // Add the object to the TagFilters table
    _context.GradeRangeFilters.Add(GradeRangeFilterObject);

    // Save changes to the database
    await _context.SaveChangesAsync();

    // Return success
    return Ok(GradeRangeFilterObject);
}


[HttpDelete("Tag/{filterId}")]
public async Task<ActionResult<bool>> DeleteTagFilterFromMap(int filterId)
{

    // Query the MapToTags table for the relationship
    var mapToTag = await _context.TagFilters
        .FirstOrDefaultAsync(mu => mu.Id == filterId);


    // Add the object to the TagFilters table
    _context.TagFilters.Remove(mapToTag);

    // Save changes to the database
    await _context.SaveChangesAsync();

    // Return success
    return Ok(true);
}

[HttpDelete("User/{userId}")]
public async Task<ActionResult<bool>> DeleteUserFilterFromMap(int userId)
{

    // Query the MapToTags table for the relationship
    var UserFilter = await _context.UserFilters
        .FirstOrDefaultAsync(mu => mu.Id == userId);


    // Add the object to the TagFilters table
    _context.UserFilters.Remove(UserFilter);

    // Save changes to the database
    await _context.SaveChangesAsync();

    // Return success
    return Ok(true);
}

[HttpDelete("GradeRange/{gradeRangeId}")]
public async Task<ActionResult<bool>> DeleteGradeRangeFilterFromMap(int gradeRangeId)
{

    // Query the MapToTags table for the relationship
    var gradeRange = await _context.GradeRangeFilters
        .FirstOrDefaultAsync(mu => mu.Id == gradeRangeId);


    // Add the object to the TagFilters table
    _context.GradeRangeFilters.Remove(gradeRange);

    // Save changes to the database
    await _context.SaveChangesAsync();

    // Return success
    return Ok(true);
}


    }

}