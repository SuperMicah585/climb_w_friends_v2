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

