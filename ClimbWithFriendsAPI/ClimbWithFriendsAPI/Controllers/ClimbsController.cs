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
    public class ClimbsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClimbsController(AppDbContext context)
        {
            _context = context;
        }

    //api/Climbs/mic
        [HttpGet("ListClimbs/{name}")]
        public async Task<ActionResult<IEnumerable<Climb>>> GetClimbsByName(String name)
        {
            // Get maps associated with the user
        var users = await _context.Climbs
            .Where(c => c.ClimbName.Contains(name))  // Filter by the given mapId
            .ToListAsync();



            return Ok(users);
        }

        //// GET: api/Climbs
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Climb>>> GetClimbs()
        //{
        //    var climbs = await _context.Climbs.ToListAsync();
        //    foreach (var climb in climbs)
        //    {
        //        if (climb.Coordinates == null || double.IsNaN(climb.Coordinates.X) || double.IsNaN(climb.Coordinates.Y))
        //        {
        //            Console.WriteLine($"Invalid Coordinates for ClimbId: {climb.ClimbId}");
        //        }
        //    }

        //    return Ok(climbs);
        //}

        //// GET: api/Climbs/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Climb>> GetClimb(int id)
        //{
        //    var climb = await _context.Climbs.FindAsync(id);

        //    if (climb == null)
        //    {
        //        return NotFound();
        //    }

        //    return climb;
        //}

        //// PUT: api/Climbs/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutClimb(int id, Climb climb)
        //{
        //    if (id != climb.ClimbId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(climb).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ClimbExists(id))
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

        //// POST: api/Climbs
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Climb>> PostClimb(Climb climb)
        //{
        //    _context.Climbs.Add(climb);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetClimb", new { id = climb.ClimbId }, climb);
        //}

        //// DELETE: api/Climbs/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteClimb(int id)
        //{
        //    var climb = await _context.Climbs.FindAsync(id);
        //    if (climb == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Climbs.Remove(climb);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool ClimbExists(int id)
        {
            return _context.Climbs.Any(e => e.ClimbId == id);
        }
    }
}
