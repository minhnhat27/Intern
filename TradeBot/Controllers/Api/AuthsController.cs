using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TradeBot.Data;
using TradeBot.Models;
using TradeBot.Repository;
using TradeBot.Request;

namespace TradeBot.Controllers.Api
{
    [Route("api/auth")]
    [ApiController]
    public class AuthsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AuthsController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, false);

            return result.Succeeded ? NoContent() : BadRequest();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            User user = new()
            {
                UserName = request.PhoneNumber,
                NormalizedUserName = request.PhoneNumber,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                NormalizedEmail = request.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString()
            };
            var result = await _userManager.CreateAsync(user, request.Password);

            return result.Succeeded ? NoContent() : BadRequest();
        }
    }
}
