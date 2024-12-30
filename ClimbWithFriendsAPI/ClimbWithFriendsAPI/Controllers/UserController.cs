using ClimbWithFriendsAPI.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClimbWithFriendsAPI.DTOs;

namespace ClimbWithFriendsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            try
            {
                var users = _context.Users.ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    [HttpGet("{auth0Id}/GetStats")]
    public async Task<UserStatistics> GetUserStatisticsAsync(string auth0Id)
    {
        var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Auth0ID == auth0Id);

        var userId = user.UserId;
        // Get all maps associated with the user's climbs
        var userMaps = await _context.MapToUsers
            .Where(c => c.UserId == auth0Id)
            .Select(c => c.MapId)
            .Distinct()
            .CountAsync();

        // Get total climbs for the user
        var totalClimbs = await _context.MapToUserToClimbs
            .CountAsync(c => c.UserId == userId);

        // Get unique climbers who climbed the same maps as the user
        var uniqueClimbers = await _context.MapToUserToClimbs
            .Where(c => _context.MapToUserToClimbs
                .Where(uc => uc.UserId == userId)
                .Select(uc => uc.MapId)
                .Contains(c.MapId))
            .Select(c => c.UserId)
            .Distinct()
            .CountAsync();

        return new UserStatistics
        {
            TotalMaps = userMaps,
            TotalClimbs = totalClimbs,
            UniqueClimbers = uniqueClimbers
        };
    }

        // POST: api/User
        [HttpPost]
        public ActionResult<User> CreateUser([FromBody] User user)
        {
            try
            {
                if (user == null)
                {
                    return BadRequest("User object is null");
                }

                // Basic validations
                if (string.IsNullOrWhiteSpace(user.Username))
                {
                    return BadRequest("Username is required.");
                }

                if (!Regex.IsMatch(user.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                {
                    return BadRequest("Invalid email format.");
                }

                // Check if the user already exists based on Auth0ID
                var existingUser = _context.Users.FirstOrDefault(u => u.Auth0ID == user.Auth0ID);
                if (existingUser != null)
                {
                    return Conflict("User with the provided Auth0ID already exists.");
                }

                // Set fields for the new user
                user.CreatedAt = DateTime.UtcNow; // Set CreatedAt to current UTC time

                // Add the user to the database
                _context.Users.Add(user);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetUsers), new { id = user.UserId }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.InnerException?.Message ?? ex.Message}");
            }
        }

    }
}
