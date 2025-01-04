using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClimbWithFriendsAPI.Data;
using NetTopologySuite;
using NetTopologySuite.Features;
using NetTopologySuite.Geometries;
using NetTopologySuite.Geometries.Implementation;
using System.Text.RegularExpressions;

namespace ClimbWithFriendsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeaturesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FeaturesController(AppDbContext context)
        {
            _context = context;
        }

        //// GET: api/Features
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Feature>>> GetFeatures()
        //{
        //    return await _context.Features.ToListAsync();
        //}

        //// GET: api/Features/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Feature>> GetFeature(int id)
        //{
        //    var feature = await _context.Features.FindAsync(id);

        //    if (feature == null)
        //    {
        //        return NotFound();
        //    }

        //    return feature;
        //}

[HttpGet("ByMap/{mapId}/ForUser/{auth0Id}")]
public async Task<ActionResult<GeoJsonShell>> ListFeaturesAsync(int mapId, string auth0Id)
{
    try
    {
        // Validate input parameters
        if (mapId <= 0)
            return BadRequest("Invalid mapId");
        if (string.IsNullOrEmpty(auth0Id))
            return BadRequest("Invalid auth0Id");

        // Check if map exists
        if (!await _context.Maps.AnyAsync(m => m.MapId == mapId))
            return NotFound($"Map with ID {mapId} not found");

        // Get filtered climb IDs in a single query
var filteredClimbIds = await GetFilteredClimbIdsAsync(mapId, auth0Id);

// Fetch features and related data in a single query
// Fetch features and related data in a single query
var features = await _context.Features
    .Where(f => f.MapId == mapId)
    .Select(f => new FeatureResult
    {
        Feature = new ClimbWithFriendsAPI.Data.Feature
        {
            FeatureId = f.FeatureId,
            // Add other feature properties as needed
        },
        Climbs = new ClimbResult
        {
            // Get climb IDs for the feature, filtered by filteredClimbIds if available
            ClimbIds = _context.MapToFeatureToClimbs
                .Where(mtf => mtf.FeatureId == f.FeatureId &&
                    filteredClimbIds.Contains(mtf.ClimbId))  
                .Select(mtf => mtf.ClimbId)
                .ToList(),

            // Get coordinates for the climbs, filtered by filteredClimbIds if available
            Coordinates = _context.MapToFeatureToClimbs
                .Where(mtf => mtf.FeatureId == f.FeatureId &&
                   filteredClimbIds.Contains(mtf.ClimbId))
                .Join(
                    _context.Climbs,
                    mtf => mtf.ClimbId,
                    c => c.ClimbId,
                    (mtf, c) => new double[] { c.Coordinates.X, c.Coordinates.Y }
                )
                .ToList()
        }
    })
    .AsSplitQuery() // Split the query to avoid cartesian explosion
    .Where(f => f.Climbs.ClimbIds.Any())  // Only include features that have associated climbs
    .ToListAsync();




        var geoJsonShell = new GeoJsonShell
        {
            Features = CreateGeoFeature(features)
        };

        return Ok(geoJsonShell);
    }
    catch (Exception)
    {
        return StatusCode(500, "An error occurred while processing your request");
    }
}

private async Task<HashSet<int>> GetFilteredClimbIdsAsync(int mapId, string auth0Id)
{
    // Check for existing filters
    var hasTagFilters = await _context.TagFilters
        .AnyAsync(tf => tf.MapId == mapId && tf.Auth0Id == auth0Id);

    var hasUserFilters = await _context.UserFilters
        .AnyAsync(tf => tf.MapId == mapId && tf.Auth0Id == auth0Id);

    var hasGradeFilter = await _context.GradeRangeFilters
        .AnyAsync(gf => gf.MapId == mapId && gf.Auth0Id == auth0Id);

    var tagClimbIds = new List<int>();
    var userClimbIds = new List<int>();
    var gradeFilteredClimbIds = new HashSet<int>();

    // Get tag filter climb IDs if they exist
    if (hasTagFilters)
    {
        tagClimbIds = await _context.TagFilters
            .Where(tf => tf.MapId == mapId && tf.Auth0Id == auth0Id)
            .Join(
                _context.ClimbToTags,
                tf => tf.TagId,
                ct => ct.TagId,
                (tf, ct) => ct.ClimbId
            )
            .Distinct()
            .ToListAsync();

        if (hasGradeFilter)
        {
            var gradeRange = await _context.GradeRangeFilters
                .Where(gf => gf.MapId == mapId && gf.Auth0Id == auth0Id)
                .FirstOrDefaultAsync();

            if (gradeRange != null)
            {
                // Get climbs that match both tag and grade criteria
                gradeFilteredClimbIds = (await _context.Climbs
                    .Where(c => tagClimbIds.Contains(c.ClimbId))
                    .Select(c => new { c.ClimbId, c.Rating })
                    .ToListAsync())
                    .Where(c => ClimbingGrades.IsGradeInRange(
                        c.Rating,
                        gradeRange.FromGrade,
                        gradeRange.ToGrade))
                    .Select(c => c.ClimbId)
                    .ToHashSet();

                return gradeFilteredClimbIds;
            }
        }

        return tagClimbIds.ToHashSet();
    }

    // Get user filter climb IDs if they exist
    if (hasUserFilters)
    {
        userClimbIds = await _context.UserFilters
            .Where(uf => uf.MapId == mapId && uf.Auth0Id == auth0Id)
            .Join(
                _context.MapToUserToClimbs,
                uf => uf.Auth0Id,
                muc => muc.Auth0ID,
                (uf, muc) => muc.ClimbId
            )
            .Distinct()
            .ToListAsync();

        if (hasGradeFilter)
        {
            var gradeRange = await _context.GradeRangeFilters
                .Where(gf => gf.MapId == mapId && gf.Auth0Id == auth0Id)
                .FirstOrDefaultAsync();

            if (gradeRange != null)
            {
                // Get climbs that match both user and grade criteria
                gradeFilteredClimbIds = (await _context.Climbs
                    .Where(c => userClimbIds.Contains(c.ClimbId))
                    .Select(c => new { c.ClimbId, c.Rating })
                    .ToListAsync())
                    .Where(c => ClimbingGrades.IsGradeInRange(
                        c.Rating,
                        gradeRange.FromGrade,
                        gradeRange.ToGrade))
                    .Select(c => c.ClimbId)
                    .ToHashSet();

                return gradeFilteredClimbIds;
            }
        }

        return userClimbIds.ToHashSet();
    }

    // If only grade filter exists
    if (hasGradeFilter)
    {
        var gradeRange = await _context.GradeRangeFilters
            .Where(gf => gf.MapId == mapId && gf.Auth0Id == auth0Id)
            .FirstOrDefaultAsync();

        if (gradeRange != null)
        {
            // Get all climbs for the map that match the grade criteria
            return (await _context.MapToFeatureToClimbs
                .Where(mfc => mfc.MapId == mapId)
                .Join(
                    _context.Climbs,
                    mfc => mfc.ClimbId,
                    c => c.ClimbId,
                    (mfc, c) => new { c.ClimbId, c.Rating }
                )
                .Distinct()
                .ToListAsync())
                .Where(c => ClimbingGrades.IsGradeInRange(
                    c.Rating,
                    gradeRange.FromGrade,
                    gradeRange.ToGrade))
                .Select(c => c.ClimbId)
                .ToHashSet();
        }
    }

    // If no filters exist, return all climb IDs
    return await _context.MapToFeatureToClimbs
        .Where(mfc => mfc.MapId == mapId)
        .Select(mfc => mfc.ClimbId)
        .Distinct()
        .ToHashSetAsync();
}



//creates new feature based on MapId and type input
public async Task<ActionResult<ClimbWithFriendsAPI.Data.Feature>> CreateFeature(int mapId, string type)
{
    try
    {
        // Validate map exists
        var mapExists = await _context.Maps.AnyAsync(m => m.MapId == mapId);
        if (!mapExists)
        {
            return NotFound("Map not found");
        }

        // Create new feature
        var newFeature = new ClimbWithFriendsAPI.Data.Feature
        {
            MapId = mapId,
            Type = type,
            TagId=0,
            CreatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
            UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
        };

        // Add to context
        _context.Features.Add(newFeature);
        
        // Save changes
        await _context.SaveChangesAsync();

        // Fetch the saved feature including its FeatureId
        var savedFeature = await _context.Features
            .FirstOrDefaultAsync(f => f.FeatureId == newFeature.FeatureId);

        // Return the saved feature
        return savedFeature;
    }
    catch (Exception ex)
    {
        return BadRequest($"Error creating feature: {ex.Message}");
    }
}




//deleted feature based on featureID input
public async Task<ActionResult> RemoveFeature(int featureId)
{
    try
    {
        // Find the feature
        var featureToRemove = await _context.Features
            .FirstOrDefaultAsync(f => f.FeatureId == featureId);

        if (featureToRemove == null)
        {
            return NotFound("Feature not found");
        }

        // Remove any associated mappings in MapToFeatureToClimbs
        var associatedMappings = await _context.MapToFeatureToClimbs
            .Where(m => m.FeatureId == featureId)
            .ToListAsync();

        if (associatedMappings.Any())
        {
            _context.MapToFeatureToClimbs.RemoveRange(associatedMappings);
        }

        // Remove the feature
        _context.Features.Remove(featureToRemove);
        
        // Save changes
        await _context.SaveChangesAsync();

        return Ok("Feature and associated mappings successfully removed");
    }
    catch (Exception ex)
    {
        return BadRequest($"Error removing feature: {ex.Message}");
    }
}


[HttpGet("{featureId}/Dependencies/UserId/{auth0Id}")]
public async Task<ActionResult<List<FeatureDependencies>>> GetFeatureDependenciesById(int featureId, string auth0Id)
{
    try 
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Auth0ID == auth0Id);
        
        // Get the single mapId for this feature
        var mapId = await _context.MapToFeatureToClimbs
            .Where(m => m.FeatureId == featureId)
            .Select(m => m.MapId)
            .FirstOrDefaultAsync();

        // Get filtered climb IDs for this map
        var filteredClimbIds = await GetFilteredClimbIdsAsync(mapId, auth0Id);

        var featureDependencies = await _context.MapToFeatureToClimbs
            .Where(m => m.FeatureId == featureId)
            .Select(m => new { m.ClimbId, m.MapId })
            .Distinct()
            // Add filter to only include climbs that are in the filtered set
            .Where(map => filteredClimbIds.Contains(map.ClimbId))
            .Select(map => new FeatureDependencies
            {
                Climb = _context.Climbs
                    .FirstOrDefault(c => c.ClimbId == map.ClimbId),

                Tags = _context.ClimbToTags
                    .Where(ct => ct.ClimbId == map.ClimbId)
                    .Join(
                        _context.MapToTags.Where(mt => mt.MapId == map.MapId),
                        ct => ct.TagId,
                        mt => mt.TagId,
                        (ct, mt) => ct.Tag
                    )
                    .ToList(),

                Attempts = _context.Attempts
                    .Where(ca => ca.ClimbId == map.ClimbId && ca.UserId == user.UserId && ca.MapId == map.MapId)
                    .FirstOrDefault(), 

                Ticks = _context.Ticks
                    .Where(ct => ct.ClimbId == map.ClimbId && ct.UserId == user.UserId && ct.MapId == map.MapId)
                    .FirstOrDefault(),
                
                ChatObject = _context.ClimbChats
                    .Where(cc => cc.ClimbId == map.ClimbId && cc.MapId == map.MapId)
                    .OrderBy(c => c.CreatedAt)
                    .Select(c => new ClimbChatResponse
                    {
                        ClimbChatId = c.ClimbChatId, 
                        Message = c.Message,
                        Username = c.User.Username,
                        Auth0Id = c.User.Auth0ID,
                        CreatedAt = c.CreatedAt
                    })
                    .ToList(),

                UserObjectForFeature = _context.MapToUserToClimbs
                    .Where(uc => uc.ClimbId == map.ClimbId && uc.MapId == map.MapId)
                    .Select(uc => new UserObjectForFeature
                    {
                        UserId = uc.UserId,
                        Auth0ID = _context.Users
                            .Where(u => u.UserId == uc.UserId)
                            .Select(u => u.Auth0ID)
                            .FirstOrDefault(),
                        Name = _context.Users
                            .Where(u => u.UserId == uc.UserId)
                            .Select(u => u.Name)
                            .FirstOrDefault(),
                        Username = _context.Users
                            .Where(u => u.UserId == uc.UserId)
                            .Select(u => u.Username)
                            .FirstOrDefault()
                    })
                    .ToList()
            })
            .ToListAsync();

        if (featureDependencies == null || !featureDependencies.Any())
        {
            return NotFound($"No dependencies found for feature {featureId}");
        }

        return Ok(featureDependencies);
    }
    catch (Exception ex)
    {
        // Log the exception
        return StatusCode(500, $"An error occurred while retrieving feature dependencies: {ex.Message}");
    }
}



[HttpGet("ByMapId/{mapId}/Dependencies/UserId/{auth0Id}")]
public async Task<ActionResult<List<FeatureDependencies>>> GetFeatureDependenciesByMapId(int mapId, string auth0Id)
{
    try 
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Auth0ID == auth0Id);
        
        // Get filtered climb IDs for this map
        var filteredClimbIds = await GetFilteredClimbIdsAsync(mapId, auth0Id);
        
        var featureDependencies = await _context.MapToFeatureToClimbs
            .Where(m => m.MapId == mapId)
            .Select(m => new { m.ClimbId, m.MapId })
            .Distinct()
            // Add filter to only include climbs that are in the filtered set
            .Where(map => filteredClimbIds.Contains(map.ClimbId))
            .Select(map => new FeatureDependencies
            {
                Climb = _context.Climbs.FirstOrDefault(c => c.ClimbId == map.ClimbId),
                Tags = _context.ClimbToTags
                    .Where(ct => ct.ClimbId == map.ClimbId)
                    .Join(
                        _context.MapToTags.Where(mt => mt.MapId == map.MapId),
                        ct => ct.TagId,
                        mt => mt.TagId,
                        (ct, mt) => ct.Tag
                    )
                    .ToList(),

                Attempts = _context.Attempts
                    .Where(ca => ca.ClimbId == map.ClimbId && ca.UserId == user.UserId && ca.MapId == map.MapId)
                    .FirstOrDefault(), 

                Ticks = _context.Ticks
                    .Where(ct => ct.ClimbId == map.ClimbId && ct.UserId == user.UserId && ct.MapId == map.MapId)
                    .FirstOrDefault(),
                ChatObject = _context.ClimbChats
                    .Where(cc => cc.ClimbId == map.ClimbId && cc.MapId == map.MapId)
                    .OrderBy(c => c.CreatedAt)
                    .Select(c => new ClimbChatResponse
                    {
                        ClimbChatId = c.ClimbChatId, 
                        Message = c.Message,
                        Username = c.User.Username,
                        Auth0Id = c.User.Auth0ID,
                        CreatedAt = c.CreatedAt
                    })
                    .ToList(),

                UserObjectForFeature = _context.MapToUserToClimbs
                    .Where(uc => uc.ClimbId == map.ClimbId && uc.MapId == map.MapId)
                    .Select(uc => new UserObjectForFeature
                    {
                        UserId = uc.UserId,
                        Auth0ID = _context.Users.FirstOrDefault(u => u.UserId == uc.UserId).Auth0ID,
                        Name = _context.Users.FirstOrDefault(u => u.UserId == uc.UserId).Name,
                        Username = _context.Users.FirstOrDefault(u => u.UserId == uc.UserId).Username
                    })
                    .ToList()
            })
            .ToListAsync();
    
        if (featureDependencies == null || !featureDependencies.Any())
        {
            return NotFound($"No dependencies found for map {mapId}");
        }

        return Ok(featureDependencies);
    }
    catch (Exception ex)
    {
        // Log the exception
        return StatusCode(500, $"An error occurred while retrieving feature dependencies: {ex.Message}");
    }
}


[HttpGet("{featureId}/Aggregate_climbs/ForUser/{auth0Id}")]
public async Task<ActionResult> getGradeCounts(int featureId, string auth0Id)
{
    try 
    {
        // Get the single mapId for this feature
        var mapId = await _context.MapToFeatureToClimbs
            .Where(m => m.FeatureId == featureId)
            .Select(m => m.MapId)
            .FirstOrDefaultAsync();

        // Get filtered climb IDs for this map
        var filteredClimbIds = await GetFilteredClimbIdsAsync(mapId, auth0Id);

        var ClimbOnGrade = await _context.MapToFeatureToClimbs
            .Where(m => m.FeatureId == featureId)
            // Add filter for filtered climbs
            .Where(m => filteredClimbIds.Contains(m.ClimbId))
            .Join(_context.Climbs, 
                  mapping => mapping.ClimbId, 
                  climb => climb.ClimbId, 
                  (mapping, climb) => climb)
            .GroupBy(c => c.Rating)
            .Select(g => new 
            {
                Rating = g.Key,
                Count = g.Count()
            })
            .ToListAsync();

        // Get unique user count for the feature (filtered)
        var uniqueUserCount = await _context.MapToFeatureToClimbs
            .Where(m => m.FeatureId == featureId)
            // Add filter for filtered climbs
            .Where(m => filteredClimbIds.Contains(m.ClimbId))
            .Join(_context.MapToUserToClimbs,
                  feature => new { ClimbId = feature.ClimbId, MapId = feature.MapId },
                  user => new { ClimbId = user.ClimbId, MapId = user.MapId },
                  (feature, user) => user.UserId)
            .Distinct()
            .CountAsync();
        
        if (ClimbOnGrade == null)
        {
            return NotFound($"No Climbs found for map {featureId}");
        }

        // Assuming GetClimbCount needs to be filtered as well
        return Ok(new 
        {
            GradeCounts = ClimbOnGrade,
            TotalCount = await GetFilteredClimbCount(featureId, filteredClimbIds),
            UniqueUserCount = uniqueUserCount
        });
    }
    catch (Exception ex)
    {
        // Log the exception
        return StatusCode(500, $"An error occurred while retrieving feature dependencies: {ex.Message}");
    }
}

// New helper method for filtered climb count
private async Task<int> GetFilteredClimbCount(int featureId, HashSet<int> filteredClimbIds)
{
    return await _context.MapToFeatureToClimbs
        .Where(m => m.FeatureId == featureId)
        .Where(m => filteredClimbIds.Contains(m.ClimbId))
        .Select(m => m.ClimbId)
        .Distinct()
        .CountAsync();
}

        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<int> GetClimbCount(int featureId)
{
    return await _context.MapToFeatureToClimbs
        .Where(m => m.FeatureId == featureId)
        .Join(
            _context.Climbs,
            mapping => mapping.ClimbId,
            climb => climb.ClimbId,
            (mapping, climb) => climb
        )
        .CountAsync(); // Return just the count
}



//user sends list of features that are on the frontend. 

public static List<object> CreateGeoFeature(List<FeatureResult> features)
{
    var featureObjects = new List<object>();
    foreach (var feature in features)

    {
        //remove repeated coordinates in feature.Climbs.Coordinates
        //add the type based on the coordinates

        var RemoveRepeatedCoordinates = RemoveRepeatCoordinates(feature.Climbs.Coordinates );
        var AddShapeTypeAndCoordinates = AddShapeType(RemoveRepeatedCoordinates);
        
        featureObjects.Add(new
        {
            type = "Feature",
            id = feature.Feature.FeatureId,
            properties = new
            {
                climbs = feature.Climbs.ClimbIds
            },
            geometry = new
            {
                type = AddShapeTypeAndCoordinates[0],
                coordinates = AddShapeTypeAndCoordinates[1]
            }
        });
    }

    return featureObjects;
}

private static double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
{
    var R = 6371e3; // Earth's radius in meters
    var φ1 = lat1 * Math.PI / 180;
    var φ2 = lat2 * Math.PI / 180;
    var Δφ = (lat2 - lat1) * Math.PI / 180;
    var Δλ = (lon2 - lon1) * Math.PI / 180;

    var a = Math.Sin(Δφ / 2) * Math.Sin(Δφ / 2) +
            Math.Cos(φ1) * Math.Cos(φ2) *
            Math.Sin(Δλ / 2) * Math.Sin(Δλ / 2);
    var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

    return R * c; // Distance in meters
}


[HttpPost("Climbs/ToMap/{mapId}")]
public async Task<List<Bucket>> ConvertDataAsync([FromBody] List<ClimbData> climbingData,int mapId)
    {
    var bucketArray = await _context.Features
        .Join(
            _context.MapToFeatureToClimbs.Where(mapping => mapping.MapId == mapId), // Filter by mapId
            feature => feature.FeatureId,
            mapping => mapping.FeatureId,
            (feature, mapping) => new { feature, mapping }
        )
        .Join(
            _context.Climbs,
            combined => combined.mapping.ClimbId,
            climb => climb.ClimbId,
            (combined, climb) => new
            {
                FeatureId = combined.feature.FeatureId,
                Coordinates = new double[] { climb.Coordinates.X, climb.Coordinates.Y }, // Convert Point to double[]
                ClimbId = climb.ClimbId
            }
        )
        .GroupBy(x => x.FeatureId)
        .Select(g => new Bucket
        {
            FeatureId = g.Key,
            Climbs = g.Select(c => new ClimbData
            {
                Coordinates = c.Coordinates, // Now this will be a double[]
                ClimbId = c.ClimbId
            }).ToList()
        })
        .ToListAsync();


        var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory();
 
        foreach (var climbObj in climbingData)
        {
            var overlappingBuckets = new HashSet<int>();

            // Check distances between the current climb and each bucket
            for (int i = 0; i < bucketArray.Count; i++)
            {
                foreach (var item in bucketArray[i].Climbs)
                {
                        var distance = CalculateDistance(
                         item.Coordinates[1], item.Coordinates[0],
                        climbObj.Coordinates[1], climbObj.Coordinates[0]);
         


                    if (distance < 1000) 
                    {
                        
                        overlappingBuckets.Add(i);
                        break; // No need to check other items in this bucket
                    }
                }
            }

    

if (overlappingBuckets.Count == 0)
{
var createdFeatureResult = await CreateFeature(mapId, "Feature");
if (createdFeatureResult.Value != null)
{
    int featureId = createdFeatureResult.Value.FeatureId;
    var newBucket = new Bucket
    {
        FeatureId = featureId,
        Climbs = new List<ClimbData> { climbObj }
    };
    await AddClimbToFeature(climbObj.ClimbId, mapId, featureId);
    bucketArray.Add(newBucket);
}
}
else if (overlappingBuckets.Count == 1)
{

    var index = overlappingBuckets.First();
    bucketArray[index].Climbs.Add(climbObj);
    await AddClimbToFeature(climbObj.ClimbId, mapId, bucketArray[index].FeatureId);
}
else
{
    var mergedBucket = new List<ClimbData>();

    foreach (var index in overlappingBuckets.OrderByDescending(x => x))
    {
        mergedBucket.AddRange(bucketArray[index].Climbs);
        await RemoveFeature(bucketArray[index].FeatureId);
        bucketArray.RemoveAt(index);
    }

var createdFeatureResult = await CreateFeature(mapId, "Feature");

if (createdFeatureResult.Value != null)
{
    int featureId = createdFeatureResult.Value.FeatureId;
    var newBucket = new Bucket
    {
        FeatureId = featureId,
        Climbs = new List<ClimbData> { climbObj }
    };
    bucketArray.Add(newBucket);
}

    foreach (var climb in mergedBucket)
    {
        await AddClimbToFeature(climb.ClimbId, mapId, createdFeatureResult.Value.FeatureId);
    }
}

        }



        return bucketArray;
    }


public async Task<ActionResult<MapToFeatureToClimb>> AddClimbToFeature(int climbId, int mapId, int featureId)
{
    try
    {
        // Check for existing mapping
        var existingMapping = await _context.MapToFeatureToClimbs
            .FirstOrDefaultAsync(m => 
                m.ClimbId == climbId && 
                m.MapId == mapId && 
                m.FeatureId == featureId);

        if (existingMapping != null)
        {
            return BadRequest("This mapping already exists");
        }

        // Create a new entry
        var newMapping = new MapToFeatureToClimb
        {
            MapId = mapId,
            ClimbId = climbId,
            FeatureId = featureId,
            AssociatedAt = DateTime.UtcNow.ToString()
        };

        // Add to the context
        _context.MapToFeatureToClimbs.Add(newMapping);
        
        // Save changes
        await _context.SaveChangesAsync();

        return Ok(newMapping);
    }
    catch (Exception ex)
    {
        return BadRequest($"Error adding climb to feature: {ex.Message}");
    }
}


public async Task<ActionResult> RemoveClimbFromFeature(int climbId, int mapId, int featureId)
{
    try
    {
        // Find the mapping entry with all three IDs
        var mappingToRemove = await _context.MapToFeatureToClimbs
            .FirstOrDefaultAsync(m => 
                m.ClimbId == climbId && 
                m.MapId == mapId && 
                m.FeatureId == featureId);

        if (mappingToRemove == null)
        {
            return NotFound("No mapping found for this climb, map, and feature combination");
        }

        // Remove the mapping
        _context.MapToFeatureToClimbs.Remove(mappingToRemove);
        
        // Save changes
        await _context.SaveChangesAsync();

        return Ok("Mapping successfully removed");
    }
    catch (Exception ex)
    {
        return BadRequest($"Error removing climb from feature: {ex.Message}");
    }
}



public static List<double[]> RemoveRepeatCoordinates(List<double[]> CoordinatesList)
{
    var uniqueSet = new HashSet<(double, double)>();
    
    // This will ensure the result is a List<double[]>
    var uniqueArray = CoordinatesList
        .Where(subArray => uniqueSet.Add((subArray[0], subArray[1])))
        .ToList();  // Convert the IEnumerable to List<double[]>
    
    return uniqueArray;
}


public static List<object> AddShapeType(List<double[]> coordinates)
{
    // Create the geometry factory
    var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);

    if (coordinates.Count == 1)
    {
        return new List<object> { "Point", coordinates };
    }
    else if (coordinates.Count == 2)
    {
        var avgX = (coordinates[0][0] + coordinates[1][0]) / 2;
        var avgY = (coordinates[0][1] + coordinates[1][1]) / 2;
        
        return new List<object> { "Point", new List<double[]> { new double[] { avgX, avgY } } };
    }
    else
    {
        var coords = coordinates.Select(c => new Coordinate(c[0], c[1])).ToArray();
        // Add the closing point if it's not already there
        if (!coords[0].Equals2D(coords[coords.Length - 1]))
        {
            coords = coords.Concat(new[] { coords[0] }).ToArray();
        }
        var polygon = geometryFactory.CreatePolygon(coords);
        var convexHull = polygon.ConvexHull();
        
        // Calculate area using the simpler spherical earth formula
        double earthRadiusMeters = 6371000; // Earth's mean radius in meters
        double areaInSquareMeters = convexHull.Area * (Math.PI / 180.0) * earthRadiusMeters * earthRadiusMeters;

        if (areaInSquareMeters < 5000)
        {
            var centroid = convexHull.Centroid;
            return new List<object> { "Point", new double[][] { 
                new double[] { centroid.X, centroid.Y } 
            }};
        }
        else
        {
            var polygonCoordinates = convexHull.Coordinates.Select(c => 
                new double[] { c.X, c.Y }
            ).ToArray();
            
            return new List<object> { "Polygon", new double[][][] { polygonCoordinates } };
        }
    }
}


}


//////If grade filter is set, climbs must run through logic below

// example bool isInRange = ClimbingGrades.IsGradeInRange("V4", "V2", "V6");

public class ClimbingGrades
{
    private static readonly Dictionary<string, int> SPECIAL_GRADES = new()
    {
        { "VEASY", -1 },
        { "VBASIC", -1 },
        { "VBEGINNER", -1 },
        { "VB", -1 },
        { "EASY", -1 },
        { "BEGINNER", -1 },
        { "BASIC", -1 }
    };

    private static string CleanGradeString(string? gradeStr)
    {
        if (string.IsNullOrEmpty(gradeStr)) return "";

        gradeStr = gradeStr.ToUpper().Replace(" ", "").Replace("V-", "V");

        if (gradeStr.Contains('-'))
        {
            gradeStr = gradeStr.Split('-')[0];
        }

        gradeStr = gradeStr.TrimEnd('-');

        if (gradeStr.StartsWith("5."))
        {
    if (gradeStr.StartsWith("5."))
    {
        // Match "5.0" to "5.9" explicitly (only one digit after "5.")
        if (Regex.IsMatch(gradeStr, @"^5\.[0-9]$|^5\.[0-9][^0-9]"))
        {
            return gradeStr.Substring(0, 3);
        }

        // Match "5.10" to "5.16" and optionally include "a", "b", or "c"
        Match match = Regex.Match(gradeStr, @"^(5\.1[0-6])([a-cA-C]?)");
        if (match.Success)
        {
            return match.Groups[1].Value + match.Groups[2].Value;
        }
    }
        }
     
        // Return the original string if no conditions are met
        return gradeStr;
    
    }

    public static int ParseGrade(string? gradeStr)
    {
        gradeStr = CleanGradeString(gradeStr);

        if (SPECIAL_GRADES.ContainsKey(gradeStr))
        {
            return SPECIAL_GRADES[gradeStr];
        }

        if (gradeStr.StartsWith("V"))
        {
            if (int.TryParse(gradeStr[1..], out int vGrade))
            {
                return 10000 + vGrade;
            }
            return SPECIAL_GRADES.ContainsKey(gradeStr) ? SPECIAL_GRADES[gradeStr] : 0;
        }

        if (gradeStr.StartsWith("5."))
        {
            string baseGrade = gradeStr[2..];
            double numeric = 0;

            if (Regex.IsMatch(baseGrade, @"\d+[a-d]", RegexOptions.IgnoreCase))
            {
                int number = int.Parse(Regex.Match(baseGrade, @"\d+").Value);
                char letter = char.ToLower(baseGrade[^1]);
                var letterValue = new Dictionary<char, double>
                {
                    { 'a', 0.25 },
                    { 'b', 0.50 },
                    { 'c', 0.75 },
                    { 'd', 1.00 }
                };

                numeric = number * 100 + (letterValue.ContainsKey(letter) ? letterValue[letter] : 0);
            }
            else
            {
                numeric = double.Parse(baseGrade) * 100;
            }

            return (int)numeric;
        }

        return 0;
    }

    public static bool IsGradeInRange(string? gradeToCheck, string? fromGrade, string? toGrade)
    {
        int gradeValue = ParseGrade(gradeToCheck);
        int fromValue = ParseGrade(fromGrade);
        int toValue = ParseGrade(toGrade);


        // Handle cases where fromGrade is higher than toGrade
        if (fromValue > toValue)
        {
            (fromValue, toValue) = (toValue, fromValue); // Swap the values
        }

        return gradeValue >= fromValue && gradeValue <= toValue;
    }
}

        //// PUT: api/Features/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutFeature(int id, Feature feature)
        //{
        //    if (id != feature.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(feature).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!FeatureExists(id))
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

        //// POST: api/Features
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Feature>> PostFeature(Feature feature)
        //{
        //    _context.Features.Add(feature);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetFeature", new { id = feature.Id }, feature);
        //}

        //// DELETE: api/Features/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteFeature(int id)
        //{
        //    var feature = await _context.Features.FindAsync(id);
        //    if (feature == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Features.Remove(feature);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

     //   private bool FeatureExists(int FeatureId)
       // {
         //   return _context.Features.Any(e => e.FeatureId == featureId);
        //}

        
    
}
