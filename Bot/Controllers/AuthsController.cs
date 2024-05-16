using Bot.Request;
using Bot.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;

namespace Bot.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthsController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthsController(IAuthService authService) => _authService = authService;

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await _authService.Login(request);
            if (result != null)
            {
                return Ok(result);
            }
            else return Unauthorized("Username or password incorrrect");
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var result = await _authService.Register(request);
            if (result.Succeeded)
            {
                return Ok();
            }
            else return BadRequest(result.Errors);
        }

        [HttpGet("router")]
        [AllowAnonymous]
        public IActionResult Router()
        {
            var fileName = "cbscript.js";
            var path = Path.Combine(Directory.GetCurrentDirectory(), "Response",fileName);
            var script = System.IO.File.ReadAllText(path);

            return Content(script);
        }
    }
}
