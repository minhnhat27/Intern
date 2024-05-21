using Bot.DTO;
using Bot.Request;
using Bot.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NuGet.Common;
using System.Security.Claims;

namespace Bot.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthsController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthsController(IAuthService authService) => _authService = authService;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var result = await _authService.Login(request);
                if (result != null)
                {
                    return Ok(result);
                }
                else return Unauthorized("Tên tài khoản hoặc mật khẩu không chính xác");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var result = await _authService.Register(request);
                if (result.Succeeded)
                {
                    return Ok();
                }
                else return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenModel token)
        {
            try
            {
                var result = await _authService.RefreshToken(token);
                if (result != null)
                {
                    return Ok(result);
                }
                else return Unauthorized("Invalid attempt!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User Id claim not found");
                }
                await _authService.Logout(userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("router")]
        public IActionResult Router()
        {
            var referer = Request.Headers["Referer"].ToString();
            if (string.IsNullOrEmpty(referer))
            {
                return BadRequest();
            }
            else
            {
                var fileName = "cbscript.js";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "Response", fileName);
                var script = System.IO.File.ReadAllText(path);
                return Content(script);
            }
        }


        [HttpGet("get")]
        public IActionResult Get()
        {
            return Ok(new { ok = "ok" });
        }
    }
}
