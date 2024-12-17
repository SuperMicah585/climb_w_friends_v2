using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClimbWithFriendsAPI.Data;

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

        ///Get: api/Features/ByMap/{mapId}
[HttpGet("ByMap/{mapId}")]
public async Task<ActionResult> ListFeatures(int mapId)
{
    // Initialize the GeoJSON shell
    var geoJsonShell = new
    {
        type = "FeatureCollection",
        features = new List<object>()
    };

    // Fetch the features associated with the given mapId
    var features = await _context.Features
                                .Where(f => f.MapId == mapId)
                                .ToListAsync();

    // Loop through each feature and add it to the GeoJSON structure
    foreach (var feature in features)
    {
        var featureObject = new
        {
            Type = "Feature",
            id= feature.FeatureId,
            Properties = new
            {
                climbs = feature.Climbs
            },
            Geometry = new
            {
                type = "Point", // Assuming Point geometry type, adjust as needed
                coordinates = feature.SimplifiedCoordinates // Adjusted to use the SimplifiedCoordinates property
            }
        };

        geoJsonShell.features.Add(featureObject);
    }

    return Ok(geoJsonShell);
}



[HttpGet("{featureId}/Dependencies")]
public async Task<ActionResult<List<FeatureDependencies>>> GetFeatureDependenciesById(int featureId)
{
    try 
    {
        var featureDependencies = await _context.MapToFeatureToClimbs
            .Where(m => m.FeatureId == featureId)
            .Select(m => m.ClimbId)
            .Distinct()
            .Select(climbId => new FeatureDependencies
            {
                Climb = _context.Climbs.FirstOrDefault(c => c.ClimbId == climbId),
                Tags = _context.ClimbToTags
                    .Where(ct => ct.ClimbId == climbId)
                    .Select(ct => _context.Tags.FirstOrDefault(t => t.TagId == ct.TagId))
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


[HttpGet("ByMapId/{mapId}/Dependencies")]
public async Task<ActionResult<List<FeatureDependencies>>> GetFeatureDependenciesByMapId(int mapId)
{
    try 
    {
        var featureDependencies = await _context.MapToFeatureToClimbs
            .Where(m => m.MapId == mapId)
            .Select(m => m.ClimbId)
            .Distinct()
            .Select(climbId => new FeatureDependencies
            {
                Climb = _context.Climbs.FirstOrDefault(c => c.ClimbId == climbId),
                Tags = _context.ClimbToTags
                    .Where(ct => ct.ClimbId == climbId)
                    .Select(ct => _context.Tags.FirstOrDefault(t => t.TagId == ct.TagId))
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


[HttpGet("{featureId}/Aggregate_climbs")]
public async Task<ActionResult> getGradeCounts(int featureId)
{
    try 
    {
var ClimbOnGrade = await _context.MapToFeatureToClimbs
    .Where(m => m.FeatureId == featureId)
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

    
        if (ClimbOnGrade == null)
        {
            return NotFound($"No Climbs found for map {featureId}");
        }

        return Ok(new 
{
    GradeCounts = ClimbOnGrade,
    TotalCount = await GetClimbCount(featureId) // Fix the invocation
});
    }
    catch (Exception ex)
    {
        // Log the exception
        return StatusCode(500, $"An error occurred while retrieving feature dependencies: {ex.Message}");
    }
}


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

