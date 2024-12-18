using Microsoft.AspNetCore.Mvc;
using ClimbWithFriendsAPI.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

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
